import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";


export default [
  {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
  {languageOptions: {globals: {...globals.browser, ...globals.node}}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  // 忽略文件
  {
    ignores: ["src/uni_modules/", "dist/"]
  },
  // 配置规则
  {
    rules: {
      "vue/multi-word-component-names": "off", // [!code ++]
    }
  },
];
