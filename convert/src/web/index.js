import StyleDictionary from "style-dictionary";
import sizePx from "./sizePx.js";
import webFont from "./webFont.js";
import webShadow from "./webShadows.js";
import webRadius from "./webRadius.js";
// import formatCss from "./formatCss.js";
import webPadding from "./webPadding.js";
import webGradient from "./webGradient.js";
import colorToHex8 from "../common/colorToHex8.js";
// import colorToRgbaString from "../common/colorToRgbaString.js";

const customElements = {
  transform: {
    "size/px": sizePx,
    "web/font": webFont,
    "web/shadow": webShadow,
    "web/radius": webRadius,
    "web/padding": webPadding,
    "web/gradient": webGradient,
    "color/hex8ToRgba": colorToHex8,
  },
  transformGroup: {
    "custom/css": StyleDictionary.transformGroup.css.concat([
      "size/px",
      "web/shadow",
      "web/radius",
      "web/padding",
      "web/font",
      "web/gradient",
      "color/hex8ToRgba",
    ]),
  },
  format: {
    // "custom/css": formatCss,
  },
  action: {},
};
export default customElements;
