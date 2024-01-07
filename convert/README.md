<!-- # How to use Design Token Variables

```bash
# step1
npm install --save-dev token-transformer sass style-dictionary
npm install @tokens-studio/sd-transforms

# step2
# /src/assets/designTokens.json -> token-transformer 1차 가공 필요
npx token-transformer src/assets/designTokens.json src/assets/output.json --preserveRawValue=true


npx token-transformer src/assets/variables2.json src/assets/variables2Output.json --preserveRawValue=true --expandTypography=true


# step3
# 1차 가공 후에 style-dictionary로 2차 가공 필요
# root에 tokensBuild.js, tokensConfig.json 파일 제작

``` -->
