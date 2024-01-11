import StyleDictionary from "style-dictionary";
import TinyColor from "@ctrl/tinycolor";

StyleDictionary.registerTransform({
  name: "custom/dimension",
  type: "value",
  transitive: true,
  matcher: (token) => {
    return ["dimension"].includes(token.type);
  },
  transformer: (token) => `${token.original.value / 10}rem`,
});

StyleDictionary.registerTransform({
  name: "custom/typo",
  type: "value",
  transitive: true,
  matcher: (token) => {
    return ["custom-fontStyle"].includes(token.type);
  },
  transformer: (token) => {
    const typoValue = token.original.value;
    return [typoValue.fontWeight, `${typoValue.fontSize / 10}rem/${typoValue.lineHeight / 10}rem`, typoValue.fontFamily].join(" ");
  },
});

StyleDictionary.registerTransform({
  name: "custom/shadow",
  type: "value",
  transitive: true,
  matcher: (token) => {
    return ["custom-shadow"].includes(token.type);
  },
  transformer: (token) => {
    const tokenValue = token.value;
    return `${tokenValue.shadowType === "innerShadow" ? "inset " : ""}${tokenValue.offsetX / 10}rem ${tokenValue.offsetY / 10}rem ${tokenValue.radius / 10}rem ${
      tokenValue.spread / 10
    }rem ${new TinyColor.TinyColor(tokenValue.color).toRgbString()}`;
  },
});

const content = [];
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

function formatCustom(dictionary, type) {
  dictionary.allTokens.map((item) => {
    if (item.type === "custom-fontStyle" || item.type === "custom-shadow") {
      content[item.name] = item.value;
    } else if (item.type === "color") {
      // const key = item.name.replace(/primitive_/g, "").trim();
      const key = item.name.split("_").splice(1).join("_");
      content[key] = item.original.value;
    } else if (item.type === "dimension") {
      if (item.attributes.category === "sementic") {
        // const subKey = item.name.replace(/sementic_/g, "").trim();
        const subKey = item.name.split("_").splice(1).join("_");
        const subValue = item.original.value;
        const realValue = subValue
          .replace(/{primitive.|}/g, "")
          .trim()
          .split(".")
          .join("_");
        if (type === "css") {
          content[subKey] = `var(--${realValue})`;
        } else if (type === "scss") {
          content[subKey] = `$${realValue}`;
        }
      } else {
        const key = item.name.split("_").splice(1).join("_");
        // const key = item.name.replace(/primitive_/g, "").trim();
        content[key] = `${item.original.value / 10}rem`;
      }
    }
  });
  return content;
}

StyleDictionary.extend("./config.json").cleanAllPlatforms().buildAllPlatforms();
