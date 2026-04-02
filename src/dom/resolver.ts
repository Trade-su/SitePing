import type { AnchorData, RectData } from "../types.js";
import { scoreFingerprint } from "./fingerprint.js";
import { fuzzyIncludes, similarity } from "./fuzzy.js";
import { adjacentText, neighborText } from "./text-context.js";

export type ResolutionStrategy = "id" | "css" | "xpath" | "scan";

export interface AnchorResolution {
  element: Element;
  confidence: number;
  strategy: ResolutionStrategy;
}

export interface ResolvedAnnotation {
  element: Element;
  rect: DOMRect;
  confidence: number;
  strategy: ResolutionStrategy;
}

/** Max elements to scan during smart fallback. */
const MAX_SCAN_CANDIDATES = 300;

/**
 * Re-anchor an annotation using a multi-level fallback strategy
 * with confidence scoring.
 *
 * Resolution order:
 * 1. getElementById — confidence 1.0
 * 2. CSS selector (querySelector) — confidence 0.95
 * 3. XPath (document.evaluate) — confidence 0.9
 * 4. Smart scan (fingerprint + text + prefix/suffix + neighbor) — confidence varies
 *
 * Returns null if all strategies fail (annotation is orphaned).
 */
export function resolveAnchor(anchor: AnchorData): AnchorResolution | null {
  // Level 1: Element ID (most stable)
  if (anchor.elementId) {
    const el = document.getElementById(anchor.elementId);
    if (el && el.tagName === anchor.elementTag)
      return { element: el, confidence: 1.0, strategy: "id" };
  }

  // Level 2: CSS Selector
  try {
    const el = document.querySelector(anchor.cssSelector);
    if (el && el.tagName === anchor.elementTag)
      return { element: el, confidence: 0.95, strategy: "css" };
  } catch {
    // Invalid selector — skip
  }

  // Level 3: XPath
  try {
    const result = document.evaluate(
      anchor.xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    const el = result.singleNodeValue;
    if (el instanceof Element && el.tagName === anchor.elementTag)
      return { element: el, confidence: 0.9, strategy: "xpath" };
  } catch {
    // Invalid XPath — skip
  }

  // Level 4: Smart scan — combine all available signals
  return smartScan(anchor);
}

/**
 * Scan DOM elements by tag and score each candidate using multiple signals:
 * fingerprint, text similarity, prefix/suffix context, neighbor text.
 *
 * Returns the best candidate above a 0.4 threshold, capped at 0.85 confidence
 * (smart scan is never 100% certain).
 */
function smartScan(anchor: AnchorData): AnchorResolution | null {
  const tag = anchor.elementTag.toLowerCase();
  const candidates = document.querySelectorAll(tag);
  if (candidates.length === 0) return null;

  let bestElement: Element | null = null;
  let bestScore = 0;

  const limit = Math.min(candidates.length, MAX_SCAN_CANDIDATES);

  for (let i = 0; i < limit; i++) {
    const el = candidates[i];
    const score = scoreCandidate(el, anchor);
    if (score > bestScore) {
      bestScore = score;
      bestElement = el;
      if (bestScore >= 0.85) break;
    }
  }

  if (!bestElement || bestScore < 0.4) return null;

  return {
    element: bestElement,
    confidence: Math.min(bestScore, 0.85),
    strategy: "scan",
  };
}

/**
 * Score a candidate element against all stored anchor signals.
 *
 * Dynamic weighting — only active signals contribute, then normalized:
 * - Text snippet (fuzzy substring match): weight 35
 * - Fingerprint (structural match): weight 25
 * - Prefix/suffix context: weight 20
 * - Neighbor text: weight 20
 */
function scoreCandidate(candidate: Element, anchor: AnchorData): number {
  let score = 0;
  let totalWeight = 0;

  // Truncate to avoid O(n*m) explosion on huge text nodes
  const candidateText = (candidate.textContent?.trim() ?? "").slice(0, 500);

  // --- Text snippet (weight 35) ---
  if (anchor.textSnippet) {
    totalWeight += 35;
    score += fuzzyIncludes(candidateText, anchor.textSnippet, 0.5) * 35;
  }

  // --- Fingerprint (weight 25) ---
  if (anchor.fingerprint) {
    totalWeight += 25;
    score += scoreFingerprint(candidate, anchor.fingerprint) * 25;
  }

  // --- Prefix/suffix context (weight 20) ---
  if (anchor.textPrefix || anchor.textSuffix) {
    totalWeight += 20;
    let contextScore = 0;
    let contextParts = 0;

    if (anchor.textPrefix) {
      const prevText = adjacentText(candidate, "before");
      contextScore += prevText ? similarity(prevText, anchor.textPrefix) : 0;
      contextParts++;
    }

    if (anchor.textSuffix) {
      const nextText = adjacentText(candidate, "after");
      contextScore += nextText ? similarity(nextText, anchor.textSuffix) : 0;
      contextParts++;
    }

    if (contextParts > 0) {
      score += (contextScore / contextParts) * 20;
    }
  }

  // --- Neighbor text (weight 20) ---
  if (anchor.neighborText) {
    totalWeight += 20;
    const candidateNeighbor = neighborText(candidate);
    score += candidateNeighbor
      ? similarity(candidateNeighbor, anchor.neighborText) * 20
      : 0;
  }

  return totalWeight > 0 ? score / totalWeight : 0;
}

/**
 * Resolve an annotation's position on the page.
 * Converts stored percentage-based rect back to absolute coordinates
 * using the current bounding box of the resolved anchor element.
 */
export function resolveAnnotation(
  anchor: AnchorData,
  rect: RectData,
): ResolvedAnnotation | null {
  const resolution = resolveAnchor(anchor);

  if (!resolution) return null;

  const bounds = resolution.element.getBoundingClientRect();
  const absoluteRect = new DOMRect(
    bounds.x + rect.xPct * bounds.width,
    bounds.y + rect.yPct * bounds.height,
    rect.wPct * bounds.width,
    rect.hPct * bounds.height,
  );

  return {
    element: resolution.element,
    rect: absoluteRect,
    confidence: resolution.confidence,
    strategy: resolution.strategy,
  };
}
