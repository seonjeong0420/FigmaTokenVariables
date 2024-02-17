import StyleDictionary from "style-dictionary";
import TinyColor from "@ctrl/tinycolor";

/** Local styles - Text Styles */
StyleDictionary.registerTransform({
  name: "custom/typo",
  type: "value",
  transitive: true,
  matcher: (token) => {
    return ["custom-fontStyle"].includes(token.type);
  },
  transformer: (token) => {
    const typoValue = token.original.value;
    return [
      typoValue.fontWeight,
      `${typoValue.fontSize / 10}rem/${typoValue.lineHeight / 10}rem`,
      typoValue.fontFamily,
    ].join(" ");
  },
});

/** Local styles - Effect Styles */
StyleDictionary.registerTransform({
  name: "custom/shadow",
  type: "value",
  transitive: true,
  matcher: (token) => {
    return ["custom-shadow"].includes(token.type);
  },
  transformer: (token) => {
    const tokenValue = token.value;
    return `${tokenValue.shadowType === "innerShadow" ? "inset " : ""}${
      tokenValue.offsetX / 10
    }rem ${tokenValue.offsetY / 10}rem ${tokenValue.radius / 10}rem ${
      tokenValue.spread / 10
    }rem ${new TinyColor.TinyColor(tokenValue.color).toRgbString()}`;
  },
});

const content = [];
function formatCustom(dictionary, type) {
  dictionary.allTokens.map((item) => {
    const key = item.name.split("_").splice(1).join("_");
    const value = item.original.value;

    if (item.type === "custom-fontStyle" || item.type === "custom-shadow") {
      content[item.name] = item.value;
    } else if (item.type === "color") {
      content[key] = value;
    } else if (item.type === "dimension") {
      if (isNaN(value)) {
        const subValueReplace = value.split(".").splice(1).join("_");
        const realValue = subValueReplace
          .replace(/{.|}/gi, "")
          .trim()
          .split(".")
          .join("_");
        if (type === "css") {
          content[key] = `var(--${realValue})`;
        } else if (type === "scss") {
          content[key] = `$${realValue}`;
        }
      } else {
        content[key] = `${value / 10}rem`;
      }
    }
  });
  return content;
}

StyleDictionary.registerFormat({
  name: "customCssFormat",
  formatter: function ({ dictionary }) {
    formatCustom(dictionary, "css");

    const cssString = Object.entries(content)
      .map(([key, value]) => ` --${key}: ${value};`)
      .join("\n");

    return `:root {\n${cssString}\n}`;
  },
});

StyleDictionary.registerFormat({
  name: "customScssFormat",
  formatter: function ({ dictionary }) {
    formatCustom(dictionary, "scss");

    const cssString = Object.entries(content)
      .map(([key, value]) => `$${key}: ${value};`)
      .join("\n");

    return `${cssString}\n`;
  },
});

StyleDictionary.extend("./config.json").cleanAllPlatforms().buildAllPlatforms();
