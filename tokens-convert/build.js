import StyleDictionary from "style-dictionary";

StyleDictionary.registerTransform({
  name: "custom/dimension",
  type: "value",
  transitive: true,
  matcher: (token) => {
    return ["dimension"].includes(token.type);
  },
  transformer: (token) => {
    return `${token.original.value / 10}rem`;
  },
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
        const name = item.name.replace(/typo_/g, "").trim().split("_").join("_");
        content[name] = item.value;
      } else if (item.type === "dimension") {
        if (item.attributes.category === "semantic") {
          const subKey = item.name
            .replace(/sementic_/g, "")
            .trim()
            .split("_")
            .join("-");
          const subValue = item.original.value;
          const realValue = subValue
            .replace(/{wezuro_.|}/g, "")
            .trim()
            .split(".")
            .join("_");
          content[subKey] = `var(--${realValue})`;
        } else {
          const key = item.name
            .replace(/wezuro_light_/g, "")
            .trim()
            .split("_")
            .join("-");
          content[key] = `${item.original.value / 10}rem`;
        }
      } else if (item.type === "color") {
        if (item.attributes.category === "semantic") {
          const key = item.name.trim().split("_").slice(1).join("-");
          const value = item.original.value.replace(/}/g, "").split(".").slice(-1);
          content[key] = `var(--${value})`;
        } else {
          const key = item.attributes.state;
          const value = item.original.value;
          content[key] = value;
        }
      } else if (item.type === "custom-shadow") {
        const key = item.attributes.type;
        const value = `${item.value.offsetX / 10}rem ${item.value.offsetY / 10}rem ${item.value.radius / 10}rem ${item.value.color}`;
        content[key] = value;
      }
    });

    const cssString = Object.entries(content)
      .map(([key, value]) => `  --${key}: ${value};`)
      .join("\n");

    return `:root {\n${cssString}\n}`;
  },
});

StyleDictionary.extend("./config.json").cleanAllPlatforms().buildAllPlatforms();
