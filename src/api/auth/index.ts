import type {
  LoginResult,
  SmsCodeLoginRequest,
  SmsCodeSendRequest,
  SmsCodeValidateRequest,
} from '@/api/auth/types'
import { post } from '@/utils/request'

/**
 * 发送短信验证码
 */
export const sendSmsApi = (smsCodeSendRequest: SmsCodeSendRequest) => {
  return post('/member/auth/send-sms-code', smsCodeSendRequest)
}

/**
 * 验证短信验证码
 */
export const validateSmsCodeApi = (
  smsCodeValidateRequest: SmsCodeValidateRequest
) => {
  return post<boolean>('/member/auth/validate-sms-code', smsCodeValidateRequest)
}

/**
 * 手机短信验证码登录
 * @param smsCodeLoginRequest 手机短信验证码登录请求参数
 */
export const loginApi = (smsCodeLoginRequest: SmsCodeLoginRequest) => {
  return post<LoginResult>('/member/auth/sms-login', smsCodeLoginRequest)
}
