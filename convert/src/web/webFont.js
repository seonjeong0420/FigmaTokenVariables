const notDefault = (value, defaultValue) =>
  value !== defaultValue ? value : "";

const fontFamily = ({ fontFamily }, { fontFamilies } = {}) =>
  fontFamilies && fontFamilies[fontFamily]
    ? fontFamilies[fontFamily]
    : fontFamily;

const webFont = {
  type: "value",
  matcher: function (token) {
    return token.type === "custom-fontStyle";
  },
  transformer: function ({ value: font }, { options }) {
    // font: font-style font-variant font-weight font-size/line-height font-family;
    return `${notDefault(font.fontStyle, "normal")} ${font.fontWeight} ${
      font.fontSize
    }/${font.lineHeight} ${fontFamily(font, options)}`.trim();
  },
};

export default webFont;
