import StyleDictionary from "style-dictionary";
import { registerTransforms, transforms } from "@tokens-studio/sd-transforms";

// sd-transforms, 2nd parameter for options can be added
// See docs: https://github.com/tokens-studio/sd-transforms
registerTransforms(StyleDictionary, {
  expand: { composition: true, typography: false, border: false, shadow: false },
  excludeParentKeys: false,
});

StyleDictionary.registerTransform({
  name: "size/rem",
  type: "value",
  transitive: true,
  matcher: (token) => {
    return ["fontSizes", "borderRadius", "spacing", "sizing", "lineHeights"].includes(token.type);
  },
  transformer: (token) => {
    return `${token.original.value / 10}rem`;
  },
});

StyleDictionary.registerTransform({
  name: "size/typography",
  type: "value",
  transitive: true,
  matcher: (token) => {
    return ["typography"].includes(token.type);
  },
  transformer: (token) => {
    const originalValue = token.original.value;
    let fontWeight = 400;
    if (originalValue.fontWeight === "Regular") {
      fontWeight = 400;
    } else if (originalValue.fontWeight === "Medium") {
      fontWeight = 500;
    } else if (originalValue.fontWeight === "Bold") {
      fontWeight = 700;
    }
    return [fontWeight, `${originalValue.fontSize / 10}rem/${originalValue.lineHeight / 10}rem`, originalValue.fontFamily].join(" ");
  },
});

StyleDictionary.registerFilter({
  name: "my-filter",
  matcher: (token) => {
    return token.filePath !== "output.json";
  },
});

StyleDictionary.extend("./config-basic.json").buildAllPlatforms();
