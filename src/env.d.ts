/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  /** 网站标题，应用名称 */
  readonly VITE_APP_TITLE: string
  /** 微信小程序AppID */
  readonly VITE_WX_APPID: string
  /** API 地址 */
  readonly VITE_APP_API_URL: string
  /** 请求超时时间 */
  readonly VITE_APP_API_TIMEOUT: number
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
