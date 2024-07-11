import type { SmsCodeLoginRequest } from '@/api/auth/types'
import { loginApi } from '@/api/auth'

export const useUserStore = defineStore('user', () => {
  // 使用 VueUse 中的 useStorage 函数将 token 保存到 localStorage 中
  const token = useStorage('token', '')

  /**
   * 手机短信验证码登录
   * @param smsCodeLoginRequest 手机短信验证码登录请求参数
   */
  const smsLogin = (smsCodeLoginRequest: SmsCodeLoginRequest) => {
    return new Promise<void>((resolve, reject) => {
      loginApi(smsCodeLoginRequest)
        .then(({ accessToken }) => {
          token.value = accessToken
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  return { token, smsLogin }
})

// 非setup
export const useUserStoreHook = () => {
  return useUserStore(store)
}
