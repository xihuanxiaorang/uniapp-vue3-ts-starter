import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import { uniuseAutoImports } from '@uni-helper/uni-use'
import path from 'node:path'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // mode: 区分生产环境还是开发环境
  console.log('command, mode -> ', command, mode)
  // pnpm dev:h5 时得到 => serve development
  // pnpm build:h5 时得到 => build production
  // pnpm dev:mp-weixin 时得到 => build development (注意区别，command为build)
  // pnpm build:mp-weixin 时得到 => build production
  // pnpm dev:app 时得到 => build development (注意区别，command为build)
  // pnpm build:app 时得到 => build production
  // dev 和 build 命令可以分别使用 .env.development 和 .env.production 的环境变量

  const { UNI_PLATFORM } = process.env
  console.log('UNI_PLATFORM -> ', UNI_PLATFORM) // 得到 mp-weixin, h5, app 等

  const env = loadEnv(mode, path.resolve(process.cwd(), 'env'))
  const { VITE_SHOW_SOURCEMAP, VITE_DELETE_CONSOLE } = env
  console.log('环境变量 env -> ', env)
  return {
    // 自定义env目录
    envDir: './env',
    // 自定义别名
    resolve: {
      alias: {
        '@': pathSrc,
      },
    },
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
        dts: path.resolve(pathSrc, 'types', 'auto-import.d.ts'),
      }),
    ],
    build: {
      // 方便非h5端调试
      sourcemap: VITE_SHOW_SOURCEMAP === 'true', // 默认是false
      target: 'es6',
      // 开发环境不用压缩
      minify: mode === 'development' ? false : 'terser',
      terserOptions: {
        compress: {
          drop_console: VITE_DELETE_CONSOLE === 'true',
          drop_debugger: true,
        },
      },
    },
  }
})
