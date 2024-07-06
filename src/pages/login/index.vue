<template>
  <view class="login-container">
    <view class="logo-container">
      <view class="logo-wrapper">
        <image class="logo" src="@/static/logo.png" />
        <text class="title font-medium">一日清单</text>
      </view>
      <text class="sub-title">欢迎登录进行使用！</text>
    </view>
    <view class="login-form">
      <view class="form-item">
        <input class="phone" placeholder="请输入手机号" type="number" />
      </view>
      <view class="form-item">
        <input class="code" placeholder="请输入验证码" type="number" />
        <text class="code-btn">获取验证码</text>
      </view>
      <button class="login-btn">登录</button>
    </view>
  </view>
</template>

<script lang="ts" setup></script>
<style lang="scss" scoped>
.login-container {
  .logo-container {
    margin-top: 285rpx;
    margin-left: 60rpx;

    .logo-wrapper {
      display: flex;
      align-items: center;

      .logo {
        width: 66rpx;
        height: 66rpx;
      }

      .title {
        margin-left: 20rpx;
        font-size: 54rpx;
        font-weight: 500;
        color: #1f2329;
      }
    }

    .sub-title {
      margin-top: 14rpx;
      font-size: 36rpx;
      font-weight: 500;
      color: #646a73;
      letter-spacing: 1rpx;
    }
  }

  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 101rpx;

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
        margin-right: 40rpx;
        font-size: 30rpx;
        color: #1456f0;
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
    }
  }
}
</style>
