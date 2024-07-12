<template>
  <view class="flex flex-col items-center w-full h-full mb-[100rpx]">
    <view class="flex flex-col items-center mt-[108rpx]">
      <image class="w-[176rpx] h-[172rpx] mb-[38rpx]" src="@/static/logo.png" />
      <text class="mb-[16rpx] text-[32rpx] font-500 text-[#3d3d3d]"
        >时光清单
      </text>
      <text class="text-[20rpx] text-[#999999]"
        >一款记录美好时光的任务管理工具
      </text>
    </view>
    <view class="flex flex-col items-center mt-[124rpx]">
      <view class="form-item">
        <input
          v-model.trim="loginForm.mobile"
          :maxlength="11"
          class="flex-1 mx-[40rpx]"
          placeholder="请输入手机号"
          type="number"
        />
      </view>
      <view class="form-item">
        <input
          v-model.trim="loginForm.smsCode"
          :maxlength="6"
          class="flex-1 mx-[40rpx]"
          placeholder="请输入验证码"
          type="number"
        />
        <button
          :disabled="codeBtnDisabled"
          class="flex items-center justify-center w-[210rpx] h-[64rpx] mr-[40rpx] text-[24rpx] !text-[#ffffff] !bg-[#1456f0] rd-[100rpx] code-btn"
          @click="sendSmsCode"
        >
          {{ isCodeSent ? remainingTime + 's可后重发' : '获取验证码' }}
        </button>
      </view>
      <button
        :disabled="loginBtnDisabled"
        class="flex items-center justify-center w-[630rpx] h-[100rpx] mt-[70rpx] text-[30rpx] !text-[#ffffff] !bg-[#1456f0] rd-[50rpx] login-btn"
        @click="login"
      >
        登录
      </button>
    </view>
    <view class="flex items-center text-[24rpx] text-[#acacac] fixed-bottom">
      <text>登录代表您已同意</text>
      <navigator
        class="text-[#1574e5]"
        hover-class="none"
        url="/pages/user-agreement/index"
        >《平台服务协议》
      </navigator>
      <text>和</text>
      <navigator
        class="text-[#1574e5]"
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
.form-item {
  @apply flex items-center w-[630rpx] h-[100rpx] mb-[50rpx] text-[30rpx] text-[#8f959e] bg-[#f7f9fc] rd-[50rpx];
}

.login-btn,
.code-btn {
  &[disabled] {
    opacity: 0.5;
  }
}

.fixed-bottom {
  position: fixed;
  bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom); /*兼容 IOS<11.2*/
  padding-bottom: env(safe-area-inset-bottom); /*兼容 IOS>11.2*/
}
</style>
