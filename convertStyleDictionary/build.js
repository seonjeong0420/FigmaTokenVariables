import StyleDictionary from "style-dictionary";

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

const content = [];
StyleDictionary.registerFormat({
  name: "customFormat",
  formatter: function ({ dictionary }) {
    dictionary.allTokens.map((item) => {
      if (item.type === "custom-fontStyle") {
        content[item.name] = item.value;
      } else if (item.type === "dimension") {
        if (item.attributes.category === "sementic") {
          const subKey = item.name.replace(/sementic_/g, "").trim();
          const subValue = item.original.value;
          const realValue = subValue
            .replace(/{primitive.|}/g, "")
            .trim()
            .split(".")
            .join("_");
          content[subKey] = `var(--${realValue})`;
        } else {
          const key = item.name.replace(/primitive_/g, "").trim();
          content[key] = `${item.original.value / 10}rem`;
        }
      } else if (item.type === "color") {
      }
    });

    const cssString = Object.entries(content)
      .map(([key, value]) => `  --${key}: ${value};`)
      .join("\n");

    return `:root {\n${cssString}\n}`;
  },
});

StyleDictionary.extend("./config.json").cleanAllPlatforms().buildAllPlatforms();
