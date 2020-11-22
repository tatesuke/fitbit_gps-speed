import document from 'document';
import clock from "clock";
import * as util from "../common/utils";
import { preferences } from "user-settings";
import { Panel } from './Panel';

export class SettingPanel extends Panel {

  constructor(elem: Element) {
    super(elem);
  }

  onClose(callback: () => any) {
    throw new Error('Method not implemented.');
  }

}
