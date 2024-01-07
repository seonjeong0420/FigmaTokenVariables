const acceptedTypes = [
  "color",
  "dimension",
  "font",
  "custom-radius",
  "custom-fontStyle",
  "custom-shadow",
  "custom-gradient",
];

const filterWeb = (token) => acceptedTypes.includes(token.type);

export default filterWeb;
