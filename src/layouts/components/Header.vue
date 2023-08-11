<script lang="ts" setup>
import { useRouter } from 'vue-router';

defineOptions({ name: 'LayoutHeader' })
const router = useRouter()
const goto = (path: string)=>{
  router.push(path)
}
</script>

<template>
  <header class="text-gray-600 body-font layout-header">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <span class="mr-5 hover:text-gray-900 cursor-pointer" @click="goto('/')">首页</span>
        <a
          href="http://www.crac.org.cn/News/Detail?ID=e3af63b9066b409d8ba10858e61f5e75"
          target="_blank"
          class="mr-5 hover:text-gray-900"
          >活动说明</a
        >
        <span class="mr-5 hover:text-gray-900 cursor-pointer" @click="goto('/onlineStatus')">总部电台上线状态</span>
        <a href="http://www.crac.org.cn/" target="_blank" class="mr-5 hover:text-gray-900"
          >CRAC 站点</a
        >
        <span class="mr-5 hover:text-gray-900 cursor-pointer" @click="goto('/archive')">历年活动</span>
      </nav>

      <a href="https://api.hamcq.cn/partner/crac/2023/en" class="mr-5 hover:text-gray-900"
        >English</a
      >
    </div>
  </header>
</template>

<style lang="scss" scoped>
.layout-header {
  position: sticky;
  top: 0;
  z-index: 1;
  flex-shrink: 0;
  background-color: #fff;
}
</style>
