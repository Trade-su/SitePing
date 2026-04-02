import type { FeedbackResponse } from "../types.js";
import { getTypeColor, type ThemeColors } from "../styles/theme.js";
import { resolveAnnotation } from "../dom/resolver.js";
import { el, setText } from "./dom-utils.js";
import type { EventBus, WidgetEvents } from "./events.js";
import type { Tooltip } from "./tooltip.js";

interface MarkerEntry {
  feedback: FeedbackResponse;
  elements: HTMLElement[];
}

const HIGHLIGHT_FADE = 300;

/**
 * Numbered markers on the page for each feedback annotation.
 *
 * 24x24px circles at top-right of annotation rects.
 * Lives OUTSIDE Shadow DOM (appended to document.body).
 * All user content set via textContent.
 */
export class MarkerManager {
  private container: HTMLElement;
  private entries: MarkerEntry[] = [];
  private highlightElements: HTMLElement[] = [];
  private pinnedFeedback: FeedbackResponse | null = null;
  private onDocumentClick: ((e: MouseEvent) => void) | null = null;

  get count(): number {
    return this.entries.length;
  }

  constructor(
    private readonly colors: ThemeColors,
    private readonly tooltip: Tooltip,
    private readonly bus: EventBus<WidgetEvents>,
  ) {
    this.container = el("div", {
      style: "position:absolute;top:0;left:0;pointer-events:none;z-index:2147483646;",
    });
    this.container.id = "siteping-markers";
    document.body.appendChild(this.container);

    this.bus.on("annotations:toggle", (visible) => {
      this.container.style.display = visible ? "block" : "none";
    });
  }

  render(feedbacks: FeedbackResponse[]): void {
    this.clear();
    feedbacks.forEach((feedback, i) => {
      const entry: MarkerEntry = { feedback, elements: [] };
      for (const annotation of feedback.annotations) {
        const anchor = {
          ...annotation,
          textSnippet: annotation.textSnippet ?? undefined,
          elementId: annotation.elementId ?? undefined,
        };
        const resolved = resolveAnnotation(anchor, annotation);
        if (!resolved) continue;
        const marker = this.createMarker(i + 1, feedback, resolved.rect);
        this.container.appendChild(marker);
        entry.elements.push(marker);
      }
      this.entries.push(entry);
    });
    this.resolveOverlaps();
  }

  addFeedback(feedback: FeedbackResponse, index: number): void {
    const entry: MarkerEntry = { feedback, elements: [] };
    for (const annotation of feedback.annotations) {
      const anchor = {
        ...annotation,
        textSnippet: annotation.textSnippet ?? undefined,
        elementId: annotation.elementId ?? undefined,
      };
      const resolved = resolveAnnotation(anchor, annotation);
      if (!resolved) continue;
      const marker = this.createMarker(index, feedback, resolved.rect);
      marker.style.animation = "sp-marker-in 0.3s cubic-bezier(0.34,1.56,0.64,1) both";
      this.container.appendChild(marker);
      entry.elements.push(marker);
    }
    this.entries.push(entry);
    this.resolveOverlaps();
  }

  private createMarker(number: number, feedback: FeedbackResponse, rect: DOMRect): HTMLElement {
    const typeColor = getTypeColor(feedback.type, this.colors);
    const isResolved = feedback.status === "resolved";

    const marker = el("div", {
      style: `
        position:absolute;
        top:${rect.top + window.scrollY - 12}px;
        left:${rect.right + window.scrollX - 12}px;
        width:24px;height:24px;
        border-radius:50%;
        background:${isResolved ? "#f3f4f6" : "#fff"};
        border:2px solid ${isResolved ? "#9ca3af" : typeColor};
        display:flex;align-items:center;justify-content:center;
        font-family:system-ui,-apple-system,sans-serif;
        font-size:12px;font-weight:600;
        color:${isResolved ? "#9ca3af" : typeColor};
        cursor:pointer;pointer-events:auto;
        transition:transform 0.15s ease,box-shadow 0.15s ease;
        user-select:none;
      `,
    });
    marker.dataset.feedbackId = feedback.id;
    setText(marker, isResolved ? "\u2713" : String(number));

    marker.addEventListener("mouseenter", () => {
      marker.style.transform = "scale(1.17)";
      marker.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
      this.tooltip.show(feedback, marker.getBoundingClientRect());
      if (!this.pinnedFeedback) this.showHighlight(feedback);
    });

    marker.addEventListener("mouseleave", () => {
      marker.style.transform = "scale(1)";
      marker.style.boxShadow = "none";
      this.tooltip.scheduleHide();
      if (!this.pinnedFeedback) this.clearHighlight();
    });

    marker.addEventListener("click", () => {
      this.pinHighlight(feedback);
      this.bus.emit("panel:toggle", true);
      marker.dispatchEvent(
        new CustomEvent("sp-marker-click", {
          detail: { feedbackId: feedback.id },
          bubbles: true,
        }),
      );
    });

    return marker;
  }

  private resolveOverlaps(): void {
    const allMarkers = Array.from(
      this.container.querySelectorAll<HTMLElement>("[data-feedback-id]"),
    );
    for (let i = 1; i < allMarkers.length; i++) {
      const cr = allMarkers[i].getBoundingClientRect();
      const pr = allMarkers[i - 1].getBoundingClientRect();
      const distance = Math.sqrt((cr.left - pr.left) ** 2 + (cr.top - pr.top) ** 2);
      if (distance < 20) {
        const currentLeft = parseFloat(allMarkers[i].style.left);
        allMarkers[i].style.left = `${currentLeft + 28}px`;
      }
    }
  }

  highlight(feedbackId: string): void {
    for (const entry of this.entries) {
      if (entry.feedback.id === feedbackId) {
        for (const markerEl of entry.elements) {
          markerEl.style.animation = "sp-pulse-outline 0.6s ease-out";
          markerEl.addEventListener("animationend", () => { markerEl.style.animation = ""; }, { once: true });
        }
      }
    }
  }

  showHighlight(feedback: FeedbackResponse): void {
    this.removeHighlightElements();

    for (const annotation of feedback.annotations) {
      const anchor = {
        ...annotation,
        textSnippet: annotation.textSnippet ?? undefined,
        elementId: annotation.elementId ?? undefined,
      };
      const resolved = resolveAnnotation(anchor, annotation);
      if (!resolved) continue;

      const typeColor = getTypeColor(feedback.type, this.colors);
      const rect = resolved.rect;

      const highlight = el("div", {
        style: `
          position:absolute;
          top:${rect.top + window.scrollY}px;
          left:${rect.left + window.scrollX}px;
          width:${rect.width}px;
          height:${rect.height}px;
          border:2px solid ${typeColor};
          background:${typeColor}1a;
          border-radius:4px;
          pointer-events:none;
          z-index:-1;
          opacity:0;
          transition:opacity ${HIGHLIGHT_FADE}ms ease;
        `,
      });

      this.container.appendChild(highlight);
      this.highlightElements.push(highlight);

      // Force reflow then fade in
      highlight.offsetHeight;
      highlight.style.opacity = "1";
    }
  }

  pinHighlight(feedback: FeedbackResponse): void {
    this.unpinHighlight();
    this.showHighlight(feedback);
    this.pinnedFeedback = feedback;

    this.onDocumentClick = (e: MouseEvent) => {
      if (this.container.contains(e.target as Node)) return;
      this.unpinHighlight();
    };
    document.addEventListener("click", this.onDocumentClick, { capture: true });
  }

  private unpinHighlight(): void {
    if (this.onDocumentClick) {
      document.removeEventListener("click", this.onDocumentClick, { capture: true });
      this.onDocumentClick = null;
    }
    this.pinnedFeedback = null;
    this.clearHighlight();
  }

  private clearHighlight(): void {
    for (const h of this.highlightElements) {
      h.style.opacity = "0";
      setTimeout(() => h.remove(), HIGHLIGHT_FADE);
    }
    this.highlightElements = [];
  }

  private removeHighlightElements(): void {
    for (const h of this.highlightElements) h.remove();
    this.highlightElements = [];
  }

  clear(): void {
    this.unpinHighlight();
    this.container.replaceChildren();
    this.entries = [];
  }

  destroy(): void {
    this.unpinHighlight();
    this.container.remove();
  }
}
