import { Panel } from "../component/Panel";
import { OnOff } from "../component/input/OnOff";
import { Radio } from "../component/input/Radio";
import { settingManager } from "../settingManager";
import { Setting } from "../../common/setting";
import { NumberPad } from "../component/NumberPad";
import { Label } from "../component/input/Label";
import { display } from "display";

export class DetailPanel extends Panel {
  constructor(elem: Element) {
    super(elem.getElementsByClassName("id_scrollview")[0]);
  }
}
