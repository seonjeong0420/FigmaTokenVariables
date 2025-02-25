# Design System Tokens Convert

Figma Tokens Studio Plugin을 활용한 디자인과 UI개발에서 디자인 토큰 사용법
[Figma Plugin](https://www.figma.com/community/plugin/888356646278934516/design-token)

## Variables 실제 예제 !

style-dictionary 로 json 가공해서 만들었다.

- tokens-convert/build.js
- tokens-convert/config.json
- tokens-convert/src/tokens/design-tokens.json

```bash
npm run build

# build/tokens.css & build/tokens.scss 파일 자동 생성
```

## Getting Started

```bash
.
├── build/                     # npm run build 실행 시 자동 생성
├── src/                       # 작업폴더
│   ├── css/                   # npm run tokenbasic 실행 시 자동 생성
│   │   ├── tokens.scss
│   │   └── tokenValues.css
│   ├── basic_tokens/
│   │    └── output.json        # tokens-transformer 실행 시 자동 생성
│   └── tokens/
│       └── design-tokens.json  # 디자이너가 전달해 준 디자인 토큰 json (wezuro token 테스트)
├── .gitignore
├── build.js             # style-dictionary 스타일로 변경 시 필요한 설정 파일
├── config.json          # style-dictionary 스타일로 변경 시 필요한 설정 파일
├── package.json
└── README.md                  # 프로젝트 설명 문서
```

### Running Tokens

사전에 설치해야 할 패키지

```
npm install --save-dev token-transformer style-dictionary sass
```

#### 1. token-transformer

css-in-js 스타일로 사용하기 위해 1차 가공하는 방법 (styled-component, emotion)

```javascript
npx token-transformer input.json output.json sets excludes
```

- input.json : 변환할 대상 파일
- output.json : 추출할 대상 파일
- sets : 변환 시 참조할 대상 key 값
- excludes : 변환 시 추출 제외 대상 key 값

##### Build

```
npx token-transformer src/basic_tokens/tokens.json src/basic_tokens/output.json --preserveRawValue=true
```

| 옵션                      | 기본값 | 설명                                                              |
| ------------------------- | :----: | ----------------------------------------------------------------- |
| expandTypography          | false  | Typography 유형의 자동 확장을 활성화한다.                         |
| expandShadow              | false  | boxShadow 유형의 자동 확장을 활성화한다.                          |
| expandBorder              | false  | stroke 유형의 자동 확장을 활성화한다.                             |
| preserveRawValue          | false  | 원시 값을 가지는 rawValue를 추가한다.                             |
| throwErrorWhenNotResolved | false  | 참조 해결되지 않을 시 오류를 사용하지 않는다.                     |
| resolveReferences         |  true  | 참조를 해결하고, 별칭이나 수학 표현식을 제거해서 토큰을 생성한다. |
| expandComposition         | false  | 레이어 관련 설정이라는데, 설명이 없다.                            |

#### 2. style-dictionary

token-transformer 1차 가공 후 tailwindcss, sass, ESModules 에서 사용하기 위해 2차 가공하는 방법

##### Build

```
npm run build:tokenbasic
```

|                   | config.json transforms 데이터 가공                      |
| ----------------- | ------------------------------------------------------- |
| name/cti/kebab    | css 또는 scss 변수명 사이 하이픈(-) 으로 연결           |
| name/cti/constant | css 또는 scss 변수명 모두 대문자로 변경                 |
| name/cti/camel    | css 또는 scss 변수명 사이 대문자 (단어 연결을 대문자로) |
| name/cti/snake    | css 또는 scss 변수명 사이 언더바(\_) 로 연결            |

**config.json (원본)**
custom 하지 않는다면, 아래와 같이 작성하면 된다.
만약, css, scss의 속성들 key 값을 변경하고 싶다면 format: 'customFormat'으로 등록한 후에 build.js에서 커스텀 코드를 작성해주어야 한다.

```bash
{
  "source": ["src/tokens/*.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "build/",
      "transforms": ["attribute/cti", "name/cti/snake", "color/hex", "size/rem", "custom/dimension", "custom/typo"],
      "files": [
        {
          "destination": "tokens.css",
          "format": "css/variables",
          "options": {
            "showFileHeader": false,
            "outputReferences": true
          }
        },
        {
          "destination": "tokens.scss",
          "format": "scss/variables",
          "options": {
            "outputReferences": true
          }
        }
      ]
    }
  }
}
```
