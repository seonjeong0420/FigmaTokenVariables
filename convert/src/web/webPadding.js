const webPadding = {
  type: "value",
  matcher: function (token) {
    return token.type === "custom-spacing";
  },
  transformer: ({ value: { top, left, bottom, right } }) => {
    if ([bottom, left, right].every((v) => v === top)) {
      return `${top / 10}rem`;
    }
    return `${top / 10}rem ${right / 10}rem ${bottom / 10}rem${left / 10}rem`;
  },
};

export default webPadding;
