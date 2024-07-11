/**
 * 手机短信发送请求参数
 */
export interface SmsCodeSendRequest {
  /**
   * 手机号
   */
  mobile: string
}

/**
 * 手机短信验证码验证请求参数
 */
export interface SmsCodeValidateRequest {
  /**
   * 手机号
   */
  mobile: string
  /**
   * 短信验证码
   */
  smsCode: string
}

/**
 * 手机短信登录请求参数
 */
export interface SmsCodeLoginRequest {
  /**
   * 手机号
   */
  mobile: string
  /**
   * 微信登录凭证，用于换取微信 openId
   */
  code: string
}

/**
 * 用户登录响应
 */
export interface LoginResult {
  /**
   * 访问令牌
   */
  accessToken: string
}
