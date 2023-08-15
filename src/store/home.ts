/*
 * @Description: 首页
 * @Author: BG7ZAG bg7zag@qq.com
 * @Date: 2023-08-11
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-14
 */
import { createInjectionState } from '@vueuse/shared'
import { ref } from 'vue'

import { search } from '@/api/v1/55'

const [useProvideHomeStore, useHomeStore] = createInjectionState(() => {
  // 呼号
  const searchQuery = reactive<Search55V1Types.IRequest>({
    callsign: '',
    year: new Date().getFullYear(),
  })

  // 搜索结果
  const searchData = ref<Search55V1Types.IResponse>([])

  /**
   * 搜索
   */
  const onSearch = async ({ callsign, year }: Partial<Search55V1Types.IRequest>) => {
    searchQuery.callsign = callsign ?? ''
    if (year) {
      searchQuery.year = year
    }

    const res = await search(searchQuery)
    if ((res.data as any)?.code === 0) {
      searchData.value = []
    } else {
      searchData.value = res.data ?? []
    }
  }

  return { searchQuery, onSearch, searchData }
})

// 使用方法参考 https://vueuse.org/shared/createInjectionState/
export { useHomeStore, useProvideHomeStore }
