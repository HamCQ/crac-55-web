<!--
 * @Description: 头部
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-11
 * @LastEditors: BG7ZAG bg7zag@qq.com
 * @LastEditTime: 2023-09-01
-->
<script lang="ts" setup>
import { ChineseOne, English, MenuUnfoldOne } from '@icon-park/vue-next'
import { useEventListener } from '@vueuse/core'
import { ElDrawer, ElIcon, ElTooltip } from 'element-plus'

import { LANGUAGE_TYPE, useGlobalState } from '@/store/global'

import HeaderNav from './HeaderNav.vue'

defineOptions({ name: 'LayoutHeader' })

const { language, changeLanguage } = useGlobalState()

const visible = ref(false)

const drawer = ref(false)

// 监听移动端触摸隐藏提示
useEventListener(document, 'touchend', () => {
  if (visible.value) {
    visible.value = false
  }
})

/**
 * 关闭遮罩层
 */
const onCloseDrawer = () => {
  drawer.value = false
}
</script>

<template>
  <header class="text-gray-600 body-font layout-header">
    <ElIcon class="layout-header-menu" :size="20">
      <MenuUnfoldOne theme="outline" size="24" fill="#333" @click="drawer = true" />
    </ElIcon>

    <h1 class="layout-header-title" :size="20">
      {{ $t('home.title') }}
    </h1>

    <div
      class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center layout-header-block"
    >
      <HeaderNav />

      <ElTooltip
        class="box-item"
        :content="language === LANGUAGE_TYPE.CHINESE ? 'English' : '中文'"
        placement="bottom"
        :visible="visible"
      >
        <English
          v-if="language === LANGUAGE_TYPE.CHINESE"
          class="layout-language"
          theme="outline"
          size="24"
          @mouseenter="visible = true"
          @mouseleave="visible = false"
          @click="changeLanguage(LANGUAGE_TYPE.ENGLISH)"
        />
        <ChineseOne
          v-else
          class="layout-language"
          theme="outline"
          size="24"
          @mouseenter="visible = true"
          @mouseleave="visible = false"
          @click="changeLanguage(LANGUAGE_TYPE.CHINESE)"
        />
      </ElTooltip>
    </div>

    <ElDrawer v-model="drawer" direction="ltr" :with-header="false" size="300px">
      <HeaderNav @close="onCloseDrawer" />
    </ElDrawer>
  </header>
</template>

<style lang="scss" scoped>
.layout-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  flex-shrink: 0;
  justify-content: flex-end;
  background-color: #fff;

  .layout-header-menu {
    display: none;
    color: var(--el-color-primary);
  }

  .layout-header-title {
    display: none;
    flex: 1;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .layout-language {
    cursor: pointer;

    &:hover {
      color: var(--el-color-primary);
    }
  }
}

/* stylelint-disable-next-line media-feature-range-notation */
@media screen and (max-width: 992px) {
  .layout-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 0 10px;
    border-bottom: 1px solid var(--el-border-color);

    .layout-header-block {
      width: 24px;
      padding: 0;

      .layout-header-nav {
        display: none;
      }
    }

    .layout-header-menu {
      display: block;
    }

    .layout-header-title {
      display: flex;
    }
  }
}
</style>
