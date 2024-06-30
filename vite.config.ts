import { resolve } from 'path'

import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import { uniuseAutoImports } from '@uni-helper/uni-use'

const pathSrc = resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      // 自动导入 @vueuse/core 相关函数，如：useStorage、useTitle 等
      // 参考自： https://github.com/sxzz/element-plus-best-practices/blob/main/vite.config.ts
      imports: ['vue', '@vueuse/core', uniuseAutoImports()],
      // 是否在 vue 模板中自动导入
      vueTemplate: true,
      // 指定自动导入函数TS类型声明文件路径，为true时在项目根目录自动创建，为false时关闭自动生成
      dts: resolve(pathSrc, 'types', 'auto-import.d.ts'),
    }),
  ],
  resolve: {
    alias: {
      '@': pathSrc,
    },
  },
})
