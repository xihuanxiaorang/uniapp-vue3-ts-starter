<template>
  <view class="login-container">
    <view class="logo-container">
      <image class="logo" src="@/static/logo.png" />
      <text class="title">时光清单</text>
      <text class="desc">一款记录美好时光的任务管理工具</text>
    </view>
    <view class="login-form">
      <view class="form-item">
        <input
          v-model.trim="loginForm.mobile"
          :maxlength="11"
          class="phone"
          placeholder="请输入手机号"
          type="number"
        />
      </view>
      <view class="form-item">
        <input
          v-model.trim="loginForm.smsCode"
          :maxlength="6"
          class="code"
          placeholder="请输入验证码"
          type="number"
        />
        <button
          :disabled="codeBtnDisabled"
          class="code-btn"
          @click="sendSmsCode"
        >
          {{ isCodeSent ? remainingTime + 's可后重发' : '获取验证码' }}
        </button>
      </view>
      <button :disabled="loginBtnDisabled" class="login-btn" @click="login">
        登录
      </button>
    </view>
    <view class="terms-container">
      <text>登录代表您已同意</text>
      <navigator
        class="terms-link"
        hover-class="none"
        url="/pages/user-agreement/index"
        >《平台服务协议》
      </navigator>
      <text>和</text>
      <navigator
        class="terms-link"
        hover-class="none"
        url="/pages/privacy-policy/index"
      >
        《隐私政策》
      </navigator>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { sendSmsApi, validateSmsCodeApi } from '@/api/auth'

/**
 * 登录表单
 */
const loginForm = reactive({
  mobile: '15019474951',
  smsCode: '198595',
})
// 手机号是否可用
const phoneAvailable = computed(() => {
  return (
    loginForm.mobile.length === 11 && /^1[3-9]\d{9}$/.test(loginForm.mobile)
  )
})
/**
 * 校验手机号
 */
const validatePhone = () => {
  if (!phoneAvailable.value) {
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none',
    })
    return false
  }
  return true
}
/**
 * 验证码是否已发送
 */
const isCodeSent = ref(false)
/**
 * 验证码剩余时间
 */
const remainingTime = ref(60)
/**
 * 验证码按钮是否可用状态
 */
const codeBtnDisabled = computed(() => {
  return isCodeSent.value || loginForm.mobile.length !== 11
})
/**
 * 发送验证码
 */
const sendSmsCode = async () => {
  if (!validatePhone()) return
  const success = await sendSmsApi({
    mobile: loginForm.mobile,
  })
  if (success) {
    isCodeSent.value = true
    const timer = setInterval(() => {
      remainingTime.value--
      if (remainingTime.value <= 0) {
        isCodeSent.value = false
        remainingTime.value = 60
        clearInterval(timer)
      }
    }, 1000)
    uni.showToast({
      title: '验证码已发送',
      icon: 'none',
    })
  }
}
/**
 * 是否正在登录
 */
const isLogging = ref(false)
/**
 * 登录按钮是否可用
 */
const loginBtnDisabled = computed(() => {
  return (
    loginForm.mobile.length !== 11 ||
    loginForm.smsCode.length !== 6 ||
    isLogging.value
  )
})
/**
 * 登录
 */
const login = async () => {
  // 校验手机号
  if (!validatePhone()) return
  // 校验短信验证码
  const success = await validateSmsCodeApi({
    mobile: loginForm.mobile,
    smsCode: loginForm.smsCode,
  })
  if (!success) {
    return
  }
  // 开始登录
  isLogging.value = true
  uni.login({
    provider: 'weixin',
    success: (res) => {
      const { code } = res
      useUserStore()
        .smsLogin({
          mobile: loginForm.mobile,
          code,
        })
        .then(() => {
          uni.switchTab({
            url: '/pages/home/index',
          })
        })
        .finally(() => {
          isLogging.value = false
        })
    },
  })
}
</script>
<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 108rpx;

    .logo {
      width: 176rpx;
      height: 172rpx;
      margin-bottom: 38rpx;
    }

    .title {
      margin-bottom: 16rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: #3d3d3d;
    }

    .desc {
      font-size: 20rpx;
      color: #999999;
    }
  }

  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 170rpx;

    .form-item {
      display: flex;
      align-items: center;
      width: 630rpx;
      height: 100rpx;
      margin-bottom: 50rpx;
      font-size: 30rpx;
      color: #8f959e;
      background: #f7f9fc;
      border-radius: 50rpx;

      input {
        margin-left: 40rpx;

        &.code {
          flex: 1;
        }
      }

      .code-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 210rpx;
        height: 64rpx;
        margin-right: 40rpx;
        font-size: 24rpx;
        color: #ffffff;
        background: #1456f0;
        border-radius: 100rpx;

        &[disabled] {
          opacity: 0.5;
        }
      }
    }

    .login-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 630rpx;
      height: 100rpx;
      margin-top: 70rpx;
      font-size: 30rpx;
      color: #ffffff;
      background: #1456f0;
      border-radius: 50rpx;

      &[disabled] {
        opacity: 0.5;
      }
    }
  }

  .terms-container {
    display: flex;
    align-items: center;
    margin-top: 192rpx;
    font-size: 24rpx;
    color: #acacac;

    .terms-link {
      color: #1574e5;
    }
  }
}
</style>
