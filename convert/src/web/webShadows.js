import TinyColor from "@ctrl/tinycolor";

const webShadow = {
  type: "value",
  matcher: function (token) {
    return token.type === "custom-shadow" && token.value !== 0;
  },
  transformer: function ({ value }) {
    return `${value.shadowType === "innerShadow" ? "inset " : ""}${
      value.offsetX
    }px ${value.offsetY / 10}rem ${value.radius / 10}rem ${
      value.spread
    }px ${new TinyColor.TinyColor(value.color).toRgbString()}`;
  },
};

export default webShadow;
