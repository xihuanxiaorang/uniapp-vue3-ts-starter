<template>
  <view class="register-container">
    <image class="logo" mode="aspectFit" src="@/static/images/register.png" />
    <view class="title">LOGO区域</view>
    <view class="register-form">
      <input
        v-model.trim="registerForm.username"
        class="register-input"
        placeholder="请输入用户名"
      />
      <input
        v-model.trim="registerForm.password"
        class="register-input"
        password
        placeholder="请输入密码"
      />
      <input
        v-model.trim="registerForm.confirmPassword"
        class="register-input"
        password
        placeholder="请再输入一次密码"
      />
      <button class="register-btn" @click="register">立即注册</button>
      <navigator
        class="register-label"
        hover-class="none"
        url="/pages/login/index"
        >已有账号，点此去登录.
      </navigator>
    </view>
  </view>
</template>
<script lang="ts" setup>
const registerForm = reactive({
  username: 'admin',
  password: '123456',
  confirmPassword: '123456',
})

const register = () => {
  console.log(registerForm)
}
</script>

<style lang="scss" scoped>
.register-container {
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

  .register-form {
    margin-top: 300upx;

    .register-input {
      padding: 20upx 40upx;
      margin-top: 30upx;
      font-size: 36upx;
      background: #e2f5fc;
      border-radius: 100upx;
    }

    .input-placeholder,
    .register-input {
      color: #94afce;
    }

    .register-label {
      padding: 60upx 0;
      font-size: 30upx;
      color: #a7b6d0;
      text-align: center;
    }

    .register-btn {
      margin-top: 60upx;
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
