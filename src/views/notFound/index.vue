<!--
 * @Description: 404页面
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-16
 * @LastEditors: BG7ZAG bg7zag@qq.com
 * @LastEditTime: 2023-08-31
-->
<script lang="ts" setup>
import '@lottiefiles/lottie-player'
defineOptions({ name: 'NotFound' })

const VITE_LOTTIE = import.meta.env.VITE_LOTTIE
const VITE_NOT_FOUND_LOTTIE = import.meta.env.VITE_NOT_FOUND_LOTTIE
</script>

<template>
  <div class="not-found">
    <lottie-player
      :src="`${VITE_LOTTIE}${VITE_NOT_FOUND_LOTTIE}`"
      background="transparent"
      speed="1.5"
      class="not-found-lottie"
      loop=""
      autoplay=""
    ></lottie-player>
    <div class="leading-relaxed">{{ $t('notfound.title') }}</div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .not-found-lottie {
    width: 500px;
    max-width: 100%;
  }
}
</style>
