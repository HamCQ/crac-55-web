/*
 * @Description: 首页
 * @Author: BG7ZAG bg7zag@qq.com
 * @Date: 2023-08-11
 * @LastEditors: BG7ZAG bg7zag@qq.com
 * @LastEditTime: 2023-08-17
 */
import { createInjectionState } from '@vueuse/shared'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import { search } from '@/api/55'

const [useProvideHomeStore, useHomeStore] = createInjectionState(() => {
  const route = useRoute()

  // 呼号
  const searchQuery = reactive<Search55V1Types.IRequest>({
    callsign: (route?.query?.callsign as string) ?? '',
    year: new Date().getFullYear()
  })

  // 搜索结果
  const searchData = ref<Search55V1Types.IResponse>({} as Search55V1Types.IResponse)

  /**
   * 搜索
   */
  const onSearch = async ({ callsign, year }: Partial<Search55V1Types.IRequest>) => {
    searchQuery.callsign = callsign ?? ''
    if (year) {
      searchQuery.year = year
    }

    const res = await search(searchQuery)

    searchData.value = res.data ?? {}
  }

  if (searchQuery.callsign) {
    onSearch(searchQuery)
  }

  return { searchQuery, onSearch, searchData }
})

// 使用方法参考 https://vueuse.org/shared/createInjectionState/
export { useHomeStore, useProvideHomeStore }
