const sizePx = {
  type: "value",
  matcher: function (token) {
    return token.type === "dimension" && token.value !== 0;
  },
  transformer: function (token) {
    return `${token.value / 10}rem`;
  },
};

export default sizePx;
