import type { SitepingConfig } from "../types.js";
import {
  ICON_ANNOTATE,
  ICON_CHAT,
  ICON_CLOSE,
  ICON_EYE,
  ICON_EYE_OFF,
  ICON_SITEPING,
} from "./icons.js";
import { parseSvg } from "./dom-utils.js";
import type { EventBus, WidgetEvents } from "./events.js";

interface RadialItem {
  id: string;
  icon: string;
  iconAlt?: string;
  label: string;
}

const ITEM_GAP = 56;

/**
 * Floating Action Button with radial menu.
 *
 * Uses CSS trigonometric positioning (sin/cos) for the radial layout.
 * 3 items: Chat, Annoter, Voir annotations.
 */
export class Fab {
  private root: HTMLElement;
  private fab: HTMLButtonElement;
  private radialContainer: HTMLElement;
  private isOpen = false;
  private annotationsVisible = true;
  private items: RadialItem[];

  constructor(
    shadowRoot: ShadowRoot,
    private readonly config: SitepingConfig,
    private readonly bus: EventBus<WidgetEvents>,
  ) {
    const position = config.position ?? "bottom-right";
    const isRight = position === "bottom-right";

    // Vertical stack above the FAB
    this.items = [
      { id: "chat", icon: ICON_CHAT, label: "Messages" },
      { id: "annotate", icon: ICON_ANNOTATE, label: "Annoter" },
      { id: "toggle-annotations", icon: ICON_EYE, iconAlt: ICON_EYE_OFF, label: "Annotations" },
    ];

    // FAB button
    this.fab = document.createElement("button");
    this.fab.className = `sp-fab sp-fab--${position} sp-anim-fab-in`;
    this.fab.appendChild(parseSvg(ICON_SITEPING));
    this.fab.setAttribute("aria-label", "Siteping — Menu feedback");
    this.fab.setAttribute("aria-expanded", "false");
    this.fab.addEventListener("click", () => this.toggle());

    // Radial container
    this.radialContainer = document.createElement("div");
    this.radialContainer.className = `sp-radial sp-radial--${position}`;
    this.radialContainer.setAttribute("role", "menu");

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const btn = document.createElement("button");
      btn.className = "sp-radial-item";
      btn.style.setProperty("--sp-i", String(i));
      btn.appendChild(parseSvg(item.icon));
      btn.setAttribute("role", "menuitem");
      btn.setAttribute("aria-label", item.label);
      btn.dataset.itemId = item.id;

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.handleItemClick(item.id);
      });

      const label = document.createElement("span");
      label.className = "sp-radial-label";
      label.textContent = item.label;
      label.style.cssText = isRight
        ? "position:absolute; right:54px; top:50%; transform:translateY(-50%); white-space:nowrap;"
        : "position:absolute; left:54px; top:50%; transform:translateY(-50%); white-space:nowrap;";
      btn.appendChild(label);

      this.radialContainer.appendChild(btn);
    }

    this.root = document.createElement("div");
    this.root.appendChild(this.radialContainer);
    this.root.appendChild(this.fab);
    shadowRoot.appendChild(this.root);

    // Close radial menu on click outside.
    // With closed Shadow DOM, composedPath() stops at the host element,
    // so we check against the host instead of internal nodes.
    const host = shadowRoot.host;
    this.onDocumentClick = (e: MouseEvent) => {
      const target = e.composedPath()[0] as Node;
      if (this.isOpen && target !== host && !host.contains(target)) {
        this.close();
      }
    };
    document.addEventListener("click", this.onDocumentClick);

    this.fab.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) this.close();
    });
  }

  private onDocumentClick: (e: MouseEvent) => void;

  private toggle(): void {
    this.isOpen ? this.close() : this.open();
  }

  private open(): void {
    this.isOpen = true;
    this.setFabIcon(ICON_CLOSE);
    this.fab.setAttribute("aria-expanded", "true");

    const buttons = this.radialContainer.querySelectorAll<HTMLButtonElement>(".sp-radial-item");
    buttons.forEach((btn, i) => {
      // Stack vertically above the FAB with initial offset + gap
      const y = -(16 + ITEM_GAP * (i + 1));
      btn.style.transform = `translate(0px, ${y}px)`;
      btn.classList.add("sp-radial-item--open");
    });
  }

  private close(): void {
    this.isOpen = false;
    this.setFabIcon(ICON_SITEPING);
    this.fab.setAttribute("aria-expanded", "false");

    const buttons = this.radialContainer.querySelectorAll<HTMLButtonElement>(".sp-radial-item");
    buttons.forEach((btn) => {
      btn.style.transform = "translate(0, 0)";
      btn.classList.remove("sp-radial-item--open");
    });
  }

  private setFabIcon(svgStr: string): void {
    this.fab.replaceChildren(parseSvg(svgStr));
  }

  private handleItemClick(id: string): void {
    this.close();

    switch (id) {
      case "chat":
        this.bus.emit("panel:toggle", true);
        break;
      case "annotate":
        this.bus.emit("annotation:start");
        break;
      case "toggle-annotations": {
        this.annotationsVisible = !this.annotationsVisible;
        this.bus.emit("annotations:toggle", this.annotationsVisible);
        const btn = this.radialContainer.querySelector('[data-item-id="toggle-annotations"]');
        if (btn) {
          btn.replaceChildren(parseSvg(this.annotationsVisible ? ICON_EYE : ICON_EYE_OFF));
        }
        break;
      }
    }
  }

  destroy(): void {
    document.removeEventListener("click", this.onDocumentClick);
    this.root.remove();
  }
}
