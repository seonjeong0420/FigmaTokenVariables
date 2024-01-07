const webRadius = {
  type: "value",
  matcher: function (token) {
    return token.type === "custom-radius";
  },
  transformer: function ({ value }) {
    if (
      [value.topRight, value.bottomLeft, value.bottomRight].every(
        (v) => v === value.topLeft
      )
    ) {
      return `${value.topLeft / 10}rem`;
    }
    return `${value.topLeft / 10}rem ${value.topRight / 10}rem ${
      value.bottomLeft / 10
    }rem ${value.bottomRight / 10}rem`;
  },
};

export default webRadius;
