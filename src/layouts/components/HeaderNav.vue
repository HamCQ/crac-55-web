<!--
 * @Description: 
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-14
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-14
-->
<script lang="ts" setup>
import { useRouter } from 'vue-router'
defineOptions({ name: 'HeaderNav' })

const emits = defineEmits<{
  (event: 'close'): void
}>()
const router = useRouter()

/**
 * 跳转页面
 */
const goto = (path: string) => {
  if (path.startsWith('http')) {
    window.open(path)
    emits('close')
    return
  }
  router.push(path)
  emits('close')
}
</script>

<template>
  <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center layout-header-nav">
    <span class="mr-5 hover:text-gray-900 cursor-pointer" @click="goto('/')">首页</span>
    <span
      @click="goto('http://www.crac.org.cn/News/Detail?ID=e3af63b9066b409d8ba10858e61f5e75')"
      class="mr-5 hover:text-gray-900"
      >活动说明</span
    >
    <span class="mr-5 hover:text-gray-900 cursor-pointer" @click="goto('/onlineStatus')"
      >总部电台上线状态</span
    >
    <span @click="goto('http://www.crac.org.cn/')" class="mr-5 hover:text-gray-900">CRAC 站点</span>
    <span class="mr-5 hover:text-gray-900 cursor-pointer" @click="goto('/archive')">历年活动</span>
  </nav>
</template>

<style lang="scss" scoped>
.layout-header-nav {
  > span {
    cursor: pointer;

    &:hover {
      color: var(--el-color-primary);
    }
  }
}

@media screen and (width <= 768px) {
  .layout-header-nav {
    flex-direction: column;
    padding: 32px;

    > span {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 10px 16px;
    }
  }
}
</style>
