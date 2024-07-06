<template>
  <wd-swiper :current="0" :list="swiperList" autoplay></wd-swiper>

  <wd-grid :column="3" border>
    <wd-grid-item icon="picture" text="文字" />
    <wd-grid-item icon="picture" text="文字" />
    <wd-grid-item icon="picture" text="文字" />
    <wd-grid-item icon="picture" text="文字" />
    <wd-grid-item icon="picture" text="文字" />
    <wd-grid-item icon="picture" text="文字" />
  </wd-grid>

  <wd-button @click="count++">+1</wd-button>

  <navigator hover-class="navigator-hover" url="/pages/login/index">
    <wd-button>跳转到登陆页面</wd-button>
  </navigator>
</template>

<script lang="ts" setup>
const swiperList = ref([
  'https://unpkg.com/wot-design-uni-assets/redpanda.jpg',
  'https://unpkg.com/wot-design-uni-assets/capybara.jpg',
  'https://unpkg.com/wot-design-uni-assets/panda.jpg',
  'https://img.yzcdn.cn/vant/cat.jpeg',
  'https://unpkg.com/wot-design-uni-assets/meng.jpg',
])

const { count } = storeToRefs(useCounterStore())
</script>

<style lang="scss" scoped></style>
