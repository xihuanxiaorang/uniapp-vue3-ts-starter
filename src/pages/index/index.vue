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
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const swiperList = ref([
  'https://unpkg.com/wot-design-uni-assets/redpanda.jpg',
  'https://unpkg.com/wot-design-uni-assets/capybara.jpg',
  'https://unpkg.com/wot-design-uni-assets/panda.jpg',
  'https://img.yzcdn.cn/vant/cat.jpeg',
  'https://unpkg.com/wot-design-uni-assets/meng.jpg',
])
</script>

<style lang="scss" scoped></style>
