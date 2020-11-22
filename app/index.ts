/*
 * Entry point for the watch app
 */

import document from 'document';
import { SpeedPage } from './SpeedPage';

const speedPage = new SpeedPage(document.getElementById("speed-page"));
speedPage.onClick(()=>{
  speedPage.hide();
});
// const detailPage = new DetailPage(document.getElementById("speed-page"));