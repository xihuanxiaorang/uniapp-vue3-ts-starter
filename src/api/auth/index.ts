import type {
  LoginResult,
  SmsCodeLoginRequest,
  SmsCodeSendRequest,
  SmsCodeValidateRequest,
} from '@/api/auth/types'

/**
 * 发送短信验证码
 */
export const sendSmsApi = (smsCodeSendRequest: SmsCodeSendRequest) => {
  return new Promise<boolean>((resolve, reject) => {
    uni.request({
      url: 'http://localhost:8800/member/auth/send-sms-code',
      method: 'POST',
      data: smsCodeSendRequest,
      success: (res) => {
        resolve((res.data as Result<boolean>).data as boolean)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

/**
 * 验证短信验证码
 */
export const validateSmsCodeApi = (
  smsCodeValidateRequest: SmsCodeValidateRequest
) => {
  return new Promise<boolean>((resolve, reject) => {
    uni.request({
      url: 'http://localhost:8800/member/auth/validate-sms-code',
      method: 'POST',
      data: smsCodeValidateRequest,
      success: (res) => {
        resolve((res.data as Result<boolean>).code === '00000')
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

/**
 * 手机短信验证码登录
 * @param smsCodeLoginRequest 手机短信验证码登录请求参数
 */
export const loginApi = (smsCodeLoginRequest: SmsCodeLoginRequest) => {
  return new Promise<LoginResult>((resolve, reject) => {
    uni.request({
      method: 'POST',
      url: 'http://localhost:8800/member/auth/sms-login',
      data: smsCodeLoginRequest,
      success: (res) => {
        console.log(res.data as Result<LoginResult>)
        resolve((res.data as Result<LoginResult>).data as LoginResult)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
