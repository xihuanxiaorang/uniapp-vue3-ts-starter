import { defineConfig, transformerDirectives } from 'unocss'
import { presetUni } from '@uni-helper/unocss-preset-uni'

export default defineConfig({
  presets: [presetUni()],
  transformers: [transformerDirectives()],
})
