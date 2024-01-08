# Design System Tokens Convert

Figma Variables를 활용한 디자인과 UI개발에서 디자인 토큰 사용법
style-dictionary 사용하여 json 가공 후 tokens.css 자동 생성

```bash
npm install
npm run build
```

‼️ 사전에 설치해야 할 패키지

```
npm install --save-dev style-dictionary sass
```

## Getting Started

```bash
.
├── build/                     # 디자인 토큰 자동 생성
│   └── tokens.css             # 해당 파일만 custom 가공
│
├── src/                       # 작업폴더
│   └── tokens/
│       └── design-tokens.json  # 디자이너가 전달해 준 디자인 토큰 json
├── .gitignore
├── build.js             # style-dictionary 스타일로 변경 시 필요한 설정 파일
├── config.json          # style-dictionary 스타일로 변경 시 필요한 설정 파일
├── package.json
└── README.md                  # 프로젝트 설명 문서
```

### style-dictionary

tailwindcss, sass, ESModules 에서 사용하기 위해 디자인 토큰(json) 가공하는 방법

|                   | config.json transforms 데이터 가공                      |
| ----------------- | ------------------------------------------------------- |
| name/cti/kebab    | css 또는 scss 변수명 사이 하이픈(-) 으로 연결           |
| name/cti/constant | css 또는 scss 변수명 모두 대문자로 변경                 |
| name/cti/camel    | css 또는 scss 변수명 사이 대문자 (단어 연결을 대문자로) |
| name/cti/snake    | css 또는 scss 변수명 사이 언더바(\_) 로 연결            |
