<script lang="ts" setup>
import { useHomeStore } from '@/store/home'

defineOptions({ name: 'HomeSearch' })

const homeStore = useHomeStore()!
</script>

<template>
  <section class="text-gray-600 body-font home-search">
    <div
      class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center home-search-block"
    >
      <div
        class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
      >
        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">2023年度</h1>
        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          纪念“5.5中国业余无线电节”空中通联活动
        </h1>
        <div class="flex w-full md:justify-start justify-center items-end">
          <div class="relative mr-4 md:w-full lg:w-full xl:w-1/2 w-2/4">
            <form method="GET" action="https://api.hamcq.cn/partner/crac/2023">
              <!-- <label for="hero-field" class="leading-7 text-sm text-gray-600">Placeholder</label> -->
              <input
                type="text"
                placeholder="请输入您的呼号"
                id="hero-field"
                name="callsign"
                class="w-full bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-purple-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                v-model="homeStore.searchQuery.callsign"
              />
            </form>
          </div>
          <button
            class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            @click="homeStore.onSearch({ callsign: homeStore.searchQuery.callsign })"
          >
            查询日志
          </button>
        </div>
        <p class="text-sm mt-2 text-gray-500 mb-8 w-full">输入呼号查询可在线获取奖状</p>
      </div>

      <div class="lg:max-w-lg lg:w-full md:w-1/2 search-img">
        <img
          class="object-cover object-center rounded"
          alt="hero"
          src="https://api.hamcq.cn/img/2023.svg"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@media screen and (width <= 768px) {
  .home-search {
    .home-search-block {
      padding: 0;

      > .items-center {
        margin-bottom: 0;
      }
    }

    .search-img {
      display: none;
    }
  }
}
</style>
