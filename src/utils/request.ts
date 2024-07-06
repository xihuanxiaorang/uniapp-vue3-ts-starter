import { createAlova } from 'alova'
import AdapterUniapp from '@alova/adapter-uniapp'

const service = createAlova({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: import.meta.env.VITE_APP_API_TIMEOUT,
  ...AdapterUniapp(),
  beforeRequest: (method) => {
    method.config.headers['Content-Type'] = 'application/json;charset=utf-8'
    const token = useUserStoreHook().token
    if (token) {
      method.config.headers['Authorization'] = `Bearer ${token}`
    }
  },
  responded: {
    onSuccess: async (response, method) => {
      const {
        statusCode,
        data: rawData,
        errMsg,
      } = response as UniNamespace.RequestSuccessCallbackResult
      const { code, data, msg } = rawData as Result
      if (statusCode === 200) {
        const { requestType } = method.config
        if (requestType) {
          return response
        }
        if (code === '00000') {
          return data
        }
        uni.showToast({
          title: msg,
          icon: 'none',
        })
        throw new Error(`请求错误[${code}]：${msg}`)
      } else {
        if (code === 'A0230') {
          const res = await uni.showModal({
            title: '提示',
            content: '当前登录已失效，请重新登录',
          })
          if (res.confirm) {
            // 清除 token & 跳转到登录页面
            useUserStoreHook().token = ''
            await uni.reLaunch({ url: '/pages/login/index' })
          }
        } else {
          uni.showToast({
            title: msg,
            icon: 'none',
          })
          throw new Error(`请求错误[${code}]：${msg}`)
        }
      }
      throw new Error(`请求错误[${statusCode}]：${errMsg}`)
    },
    onError: (err) => {
      uni.showToast({
        title: '无法连接服务器，请稍后再试',
        icon: 'none',
      })
      throw new Error(`请求错误：${err}`)
    },
  },
})

const get = <T>(url: string, params?: any) => {
  return service.Get<T>(url, {
    params,
  })
}

const post = <T>(url: string, data?: any) => {
  return service.Post<T>(url, data)
}

export { get, post }
