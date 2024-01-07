const StyleDictionary = require("style-dictionary");

/**
 * registerFormat : 변수 이름 바꾸기
 * name : config에 작성한 format 값에 들어갈 이름 (해당 이름을 참조하게 됨)
 * formatter: 우리가 변환할 형태를 커스텀할 수 있는 부분, return하는 내용으로 결과물에 보이게 된다.
 */
StyleDictionary.registerFormat({
  name: "customStyle",
  formatter: ({ dictionary, options }) => {
    const variablesObject = dictionary.allProperties.reduce(
      (acc, { value, type, path }) => {
        if (type === "color") {
          const key = path
            // .map((name) => name.replace(/primitive|color/g, "").trim())
            .map((name) => name.replace("primitive", "").trim())
            .filter((name) => name.length !== 0)
            .join("-");
          acc[key] = value;
        } else if (type === "custom-fontStyle") {
          const fontStyle = `${value.fontWeight} ${value.fontSize / 10}rem/${
            value.lineHeight / 10
          }rem ${value.fontFamily}`;
          const key = path[1].trim();
          acc[key] = fontStyle;
        } else if (type === "dimension") {
        }
        return acc;
      },
      {}
    );

    const spacingObject = dictionary.allTokens.map((token) => {
      let value = JSON.stringify(token.value);

      if (token.original.type === "dimension") {
      }

      if (dictionary.usesReference(token.original.value)) {
        // Note: make sure to use `token.original.value` because
        // `token.value` is already resolved at this point.
        const refs = dictionary.getReferences(token.original.value);

        refs.forEach((ref) => {
          value = value.replace(ref.value, function () {
            return `${ref.name}`;
          });
        });
      }
    });

    const cssString = Object.entries(variablesObject)
      .map(([key, value]) => `  --${key}: ${value};`)
      .join("\n");

    return `:root {\n${cssString}\n}`;
  },
});

/**
 * tokensCustom.json Description
 * source : 디자인 토큰이 저장된 장소
 * platforms : 디자인 토큰을 변환할 형태를 정의한 부분 (플랫폼 이름: 객체 형태)
 *  위 코드에선 scss라는 이름을 가지고 내부 속성에 따라 변환한다.
 * transformGroup : color, size, time 등 해당 속성들을 어떻게 변환할 껀지 한꺼번에 정의한 형태
 * buildPath : 어디에 변환되어 저장될 건지
 * files
 *  destination : 변환될 파일 이름
 *  format: 변환될 형태를 정의한 포맷
 */
// StyleDictionary.extend("./tokensCustom.json").buildAllPlatforms();

const styleDictionary = StyleDictionary.extend({
  source: ["tokens/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "build/",
      files: [
        {
          destination: "variables.css",
          format: "customStyle",
          // format: "css/variables",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
});

styleDictionary.buildAllPlatforms();
