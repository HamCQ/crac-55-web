<!-- 底部 -->
<script lang="ts" setup>
import { useRouter } from 'vue-router'

defineOptions({ name: 'LayoutFooter' })
const year = new Date().getFullYear()

const router = useRouter()
const goto = (path: string) => {
  router.push(path)
}
</script>

<template>
  <footer class="text-gray-600 body-font layout-footer">
    <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
      <a
        href="http://www.crac.org.cn/News/Detail?ID=bfeb6cac9a284c5183d87c1c55fdc222"
        target="_blank"
        title="值机员留念徽章"
      >
        <img
          alt="ecommerce"
          class="w-20 h-20 object-cover rounded"
          src="https://crac.hamcq.cn/img/WechatIMG1607.jpg"
        />
      </a>

      <span>
        ©
        <a class="cursor-pointer" href="http://www.crac.org.cn/" target="_blank"
          >2023-{{ year }} CRAC
        </a>
      </span>

      <p
        class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4"
      >
        <a
          class="text-sm text-gray-500 cursor-pointer"
          href="https://forum.hamcq.cn/d/174"
          target="_blank"
          >{{ $t('layout.footer.contributions') }}</a
        >

        <a class="text-sm text-gray-500 pl-4 cursor-pointer" @click="goto('/acknowledgement')">{{
          $t('layout.footer.acknowledgement')
        }}</a>
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.layout-footer {
  flex-shrink: 0;
  background-color: #fff;

  .cursor-pointer {
    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
