import { createSSRApp } from 'vue'
import App from './App.vue'
import { setupStore } from '@/stores'
import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)
  // 全局注册store状态管理
  setupStore(app)
  return {
    app,
  }
}
