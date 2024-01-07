import TinyColor from "@ctrl/tinycolor";

const colorToHex8 = {
  type: "value",
  matcher: function (token) {
    return token.type === "color";
  },
  transformer: function ({ value }) {
    return `${new TinyColor.TinyColor(value).toHex8String()}`;
  },
};

export default colorToHex8;
