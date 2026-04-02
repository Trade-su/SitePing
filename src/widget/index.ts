import type { SitepingConfig, SitepingInstance } from "../types.js";
import { launch } from "./launcher.js";

export type {
  AnchorData,
  AnnotationPayload,
  AnnotationResponse,
  FeedbackPayload,
  FeedbackResponse,
  FeedbackStatus,
  FeedbackType,
  RectData,
  SitepingConfig,
  SitepingInstance,
} from "../types.js";

/**
 * Initialize the Siteping feedback widget.
 *
 * @example
 * ```ts
 * import { initSiteping } from '@neosianexus/siteping'
 *
 * const { destroy } = initSiteping({
 *   endpoint: '/api/siteping',
 *   projectName: 'my-project',
 * })
 * ```
 */
export function initSiteping(config: SitepingConfig): SitepingInstance {
  return launch(config);
}
