import { Panel } from "app/component/Panel";
import * as util from "common/utils";

const SCROLL_START_DISTANCE = 15;
const WIDTH = 336;

export class HorizontalScrollPanel {
  private gElem: GroupElement;
  private panels: Panel[];

  private currentPagenumber: number = 0;

  private startX: number;
  private isScrolling: boolean = false;
  private indicators: GraphicsElement[] = [];

  constructor(elem: Element, panels: Panel[]) {
    this.gElem = elem.getElementById(
      
      "horizontal-scroll-panel__g"
    
    ) as GroupElement;
    this.panels = panels;

    for (let i = 0; i < panels.length; i++) {
      this.indicators.push(
        elem.getElementById(
          "horizontal-scroll-panel__indicator-" + i
        ) as GraphicsElement
      );
    }

    panels.forEach((panel) => {
      panel.onMouseDown((e) => this.start(e));
      panel.onMouseUp((e) => this.stop(e));
      panel.onMouseOut((e) => this.stop(e));
      panel.onMouseMove((e) => this.onMouseMove(e));
    });

    this.scrollTo(0);
  }
  private start(e: MouseEvent) {
    this.startX = e.screenX;
  }
  private stop(e: MouseEvent) {
    if (this.startX === null) {
      return;
    }
    const diff = this.startX - e.screenX;
    this.startX = null;
    this.isScrolling = false;
    if (Math.abs(diff) < WIDTH / 2) {
      this.scrollTo(this.currentPagenumber);
    } else if (diff > 0) {
      this.scrollTo(this.currentPagenumber + 1);
    } else {
      this.scrollTo(this.currentPagenumber - 1);
    }
  }

  private onMouseMove(e: MouseEvent) {
    if (this.startX === null) {
      return;
    }
    const diff = this.startX - e.screenX;
    if (!this.isScrolling) {
      if (Math.abs(diff) < SCROLL_START_DISTANCE) {
        return;
      }
      this.isScrolling = true;
    }

    if (diff > 0 && this.panels.length <= this.currentPagenumber + 1) {
      return;
    } else if (diff < 0 && this.currentPagenumber == 0) {
      return;
    }

    const x = -(this.currentPagenumber * WIDTH) - diff;
    this.gElem.groupTransform.translate.x = x;
  }

  private scrollTo(pageNumber: number) {
    if (pageNumber < 0 || this.panels.length <= pageNumber) {
      return;
    }
    this.currentPagenumber = pageNumber;
    this.gElem.groupTransform.translate.x = -this.currentPagenumber * WIDTH;

    this.indicators.forEach((elem, i) => {
      if (i === pageNumber) {
        util.addClassName(elem, "horizontal-scroll-panel__indicator--active");
      } else {
        util.removeClassName(
          elem,
          "horizontal-scroll-panel__indicator--active"
        );
      }
    });
  }
}
