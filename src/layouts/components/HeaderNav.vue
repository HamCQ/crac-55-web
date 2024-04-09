<!--菜单-->
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import { useConfigState } from '@/store/config'
const { t } = useI18n()

defineOptions({ name: 'HeaderNav' })

const emits = defineEmits<{
  (event: 'close'): void
}>()
const router = useRouter()
const route = useRoute()

/** 是否今年 */
const hasThisYear = computed(() => {
  if (!route.query?.year) return true

  return route.query?.year === new Date().getFullYear().toString()
})

/**
 * 跳转页面
 */
const goto = (path: string) => {
  if (path.startsWith('http')) {
    window.open(path)
    emits('close')
    return
  }
  const year = route.query?.year as string
  path = year ? path + '?year=' + year : path
  router.push(path)
  emits('close')
}

/**
 * 返回今年首页
 */
const onBack = () => {
  router.push('/')
  emits('close')
}

const { config } = useConfigState()

/**
 * 菜单列表
 */
const menus = computed(() => [
  // 回今年
  {
    show: !hasThisYear.value,
    title: t('layout.header.backThisYear'),
    path: '',
    onClick: onBack
  },
  // 首页
  {
    show: true,
    title: t('layout.header.home'),
    path: '/'
  },
  // 统计
  {
    show: true,
    title: t('layout.header.statistics'),
    path: '/statistics'
  },
  // 总部电台上线状态
  {
    show: true,
    title: t('layout.header.onTheAir'),
    path: '/onlineStatus'
  },
  // 历年活动
  // {
  //   show: true,
  //   title: t('layout.header.archive'),
  //   path: '/archive'
  // },
  // 活动说明
  {
    show: true,
    title: t('layout.header.about'),
    path: config.value?.crac_desc ?? ''
  }
])
</script>

<template>
  <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center layout-header-nav">
    <!-- 回今年 -->
    <template v-for="item in menus" :key="item.title">
      <span
        :class="['mr-5 cursor-pointer', route.path === item.path ? 'active' : '']"
        v-if="item.show"
        @click="() => (item.onClick ? item.onClick() : goto(item.path))"
        >{{ item.title }}</span
      >
    </template>
  </nav>
</template>

<style lang="scss" scoped>
.layout-header-nav {
  > span {
    cursor: pointer;

    &:hover,
    &.active {
      color: var(--el-color-primary);
    }
  }
}

/* stylelint-disable-next-line media-feature-range-notation */
@media screen and (max-width: 992px) {
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
