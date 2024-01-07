import StyleDictionary from "style-dictionary";
import deepMerge from "deepmerge";
import webConfig from "./src/web/index.js";

StyleDictionary.registerFilter({
  name: "validToken",
  matcher: function (token) {
    return [
      "dimension",
      "string",
      "number",
      "color",
      "custom-spacing",
      "custom-gradient",
      "custom-fontStyle",
      "custom-radius",
      "custom-shadow",
    ].includes(token.type);
  },
});

const StyleDictionaryExtended = StyleDictionary.extend({
  ...deepMerge.all([webConfig]),
  source: ["src/tokens/*.json"],
  platforms: {
    scss: {
      transformGroup: "custom/css",
      buildPath: "build/scss/",
      files: [
        {
          destination: "_variables.scss",
          format: "scss/variables",
          filter: "validToken",
          options: {
            showFileHeader: false,
            outputReferences: true,
          },
        },
      ],
    },
    css: {
      transformGroup: "custom/css",
      buildPath: "build/css/",
      files: [
        {
          destination: "_variables.css",
          format: "css/variables",
          filter: "validToken",
          options: {
            showFileHeader: false,
            outputReferences: true,
          },
        },
      ],
    },
  },
});

StyleDictionaryExtended.buildAllPlatforms();
