/*
 * Entry point for the watch app
 */
import document from 'document';
import { geolocation } from "geolocation";
import clock from "clock";
import * as util from "../common/utils";
import { preferences } from "user-settings";
import { Panel } from './Panel';

const SCREEN_WIDTH = 336;
const SCREEN_HEIGHT = 336;

let pageNumber = 0;
let startX = 0;
let previousX = 0;

export class ContentPanel extends Panel {

  private pages: Element[];

  constructor(elem: Element, left: Panel, right: Panel) {
    super(elem);
    left.x = 0;
    right.x = SCREEN_WIDTH;
    this.onClick(()=>{
      // left.hide();
      // right.show();
      console.log("aaa");
    });
  }

  onTripreClick(callback: ()=>any) {
    callback();
  }


}

