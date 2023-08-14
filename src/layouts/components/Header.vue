<!--
 * @Description: 头部
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-11
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-14
-->
<script lang="ts" setup>
import { ChineseOne, English,  MenuUnfoldOne } from '@icon-park/vue-next'
import { ElDrawer, ElIcon, ElTooltip } from 'element-plus'

import { LANGUAGE_TYPE, useGlobalState } from '@/store/global'

import HeaderNav from './HeaderNav.vue'

defineOptions({ name: 'LayoutHeader' })
// 站点标题
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE

const { language, changeLanguage } = useGlobalState()


const drawer = ref(false)
/**
 * 关闭遮罩层
 */
const onCloseDrawer = ()=>{
  drawer.value = false
}
</script>

<template>
  <header class="text-gray-600 body-font layout-header">
    <ElIcon class="md:hidden layout-header-menu" :size="20">
      <MenuUnfoldOne theme="outline" size="24" fill="#333" @click="drawer = true" />
    </ElIcon>

    <h1 class="layout-header-title" :size="20">
      {{ VITE_APP_TITLE }}
    </h1>

    <div
      class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center layout-header-block"
    >
      <HeaderNav />

      <ElTooltip
        class="box-item"
        :content="language === LANGUAGE_TYPE.CHINESE ? 'English' : '中文'"
        placement="bottom"
      >
        <English
          v-if="language === LANGUAGE_TYPE.CHINESE"
          class="layout-language"
          theme="outline"
          size="24"
          @click="changeLanguage(LANGUAGE_TYPE.ENGLISH)"
        />
        <ChineseOne
          v-else
          class="layout-language"
          theme="outline"
          size="24"
          @click="changeLanguage(LANGUAGE_TYPE.CHINESE)"
        />
      </ElTooltip>
    </div>

    <ElDrawer v-model="drawer" direction="ltr" :with-header="false" size="80%">
      <HeaderNav @close="onCloseDrawer"/>
    </ElDrawer>
  </header>
</template>

<style lang="scss" scoped>
.layout-header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  flex-shrink: 0;
  justify-content: flex-end;
  background-color: #fff;

  .layout-header-menu {
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

@media screen and (width <= 768px) {
  .layout-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 10px;
    border-bottom: 1px solid var(--el-border-color);

    
    .layout-header-block {
      width: 24px;
      padding: 0;

      .layout-header-nav {
        display: none;
      }
    }

    .layout-header-title {
      display: flex;
    }
  }
}
</style>
