import document from "document";
import clock from "clock";
import * as util from "../../common/utils";
import { preferences } from "user-settings";
import { Panel } from "../component/Panel";

export class SettingPanel extends Panel {
  constructor(elem: Element) {
    super(elem.getElementsByClassName("id_scrollview")[0]);
  }
}
