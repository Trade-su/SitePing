import html2canvas from "html2canvas";

/**
 * Capture a screenshot of the page region within the given viewport DOMRect.
 * Returns a JPEG data URL, or null on failure.
 *
 * - Excludes SitePing overlay elements via `ignoreElements`
 * - Downscales to maxWidth (1200px default) to keep payload reasonable
 * - JPEG at 85% quality (~50-150 KB for a typical annotated area)
 */
export async function captureScreenshot(
  rect: DOMRect,
  options?: { quality?: number; maxWidth?: number },
): Promise<string | null> {
  const quality = options?.quality ?? 0.85;
  const maxWidth = options?.maxWidth ?? 1200;

  try {
    const canvas = await html2canvas(document.body, {
      x: window.scrollX + rect.x,
      y: window.scrollY + rect.y,
      width: rect.width,
      height: rect.height,
      scale: window.devicePixelRatio,
      useCORS: true,
      allowTaint: true,
      logging: false,
      ignoreElements: (element: Element) => {
        return (
          element.tagName === "SITEPING-WIDGET" ||
          element.closest?.("siteping-widget") !== null ||
          element.getAttribute?.("data-siteping-ignore") === "true"
        );
      },
    });

    // Downscale if too wide
    let targetW = canvas.width;
    let targetH = canvas.height;
    if (targetW > maxWidth) {
      const ratio = maxWidth / targetW;
      targetW = maxWidth;
      targetH = Math.round(targetH * ratio);
    }

    if (targetW === canvas.width && targetH === canvas.height) {
      return canvas.toDataURL("image/jpeg", quality);
    }

    const scaled = document.createElement("canvas");
    const ctx = scaled.getContext("2d");
    if (!ctx) return null;

    scaled.width = targetW;
    scaled.height = targetH;
    ctx.drawImage(canvas, 0, 0, targetW, targetH);
    return scaled.toDataURL("image/jpeg", quality);
  } catch (err) {
    console.warn("[siteping] Screenshot capture failed:", err);
    return null;
  }
}
