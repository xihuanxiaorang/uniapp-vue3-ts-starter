<template>
  <view class="login-container">
    <image class="logo" mode="aspectFit" src="@/static/images/login.png" />
    <view class="title">LOGO区域</view>
    <view class="login-form">
      <input
        v-model.trim="loginForm.username"
        class="login-input"
        placeholder="请输入用户名"
      />
      <input
        v-model.trim="loginForm.password"
        class="login-input"
        password
        placeholder="请输入密码"
      />
      <view class="login-label">忘记密码？</view>
      <button class="login-btn" @click="login">立即登录</button>
      <navigator
        class="login-label"
        hover-class="none"
        url="/pages/register/index"
        >还没有账号？点此注册.
      </navigator>
    </view>
  </view>
</template>

<script lang="ts" setup>
const loginForm = reactive({
  username: 'admin',
  password: '123456',
})

const login = () => {
  console.log(loginForm)
}
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  padding: 0 100upx;

  .logo {
    width: 100%;
    height: 310upx;
  }

  .title {
    position: absolute;
    top: 0;
    width: 100%;
    margin-left: -100upx;
    font-size: 68upx;
    line-height: 360upx;
    color: #fff;
    text-align: center;
  }

  .login-form {
    margin-top: 300upx;

    .login-input {
      padding: 20upx 40upx;
      margin-top: 30upx;
      font-size: 36upx;
      background: #e2f5fc;
      border-radius: 100upx;
    }

    .input-placeholder,
    .login-input {
      color: #94afce;
    }

    .login-label {
      padding: 60upx 0;
      font-size: 30upx;
      color: #a7b6d0;
      text-align: center;
    }

    .login-btn {
      font-size: 36upx;
      color: #fff;
      background: #ff65a3;
      border: 0;
      border-radius: 100upx;

      &:after {
        border: 0;
      }

      &.button-hover {
        transform: translate(1upx, 1upx);
      }
    }
  }
}
</style>
