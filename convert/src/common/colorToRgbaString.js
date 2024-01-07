import TinyColor from "@ctrl/tinycolor";

const colorToRgbaString = {
  type: "value",
  matcher: function (token) {
    return token.type === "color";
  },
  transformer: function ({ value }) {
    return `${new TinyColor.TinyColor(value).toRgbString()}`;
  },
};

export default colorToRgbaString;
