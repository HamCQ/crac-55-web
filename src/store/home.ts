/*
 * @Description: 首页
 * @Author: BG7ZAG bg7zag@qq.com
 * @Date: 2023-08-11
 * @LastEditors: zyg0121 zhouyiguo2012@qq.com
 * @LastEditTime: 2023-08-17
 */
import { createInjectionState } from '@vueuse/shared'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import { search , award } from '@/api/55'

const [useProvideHomeStore, useHomeStore] = createInjectionState(() => {
  const route = useRoute()

  // 呼号
  const searchQuery = reactive<Search55V1Types.IRequest>({
    callsign: (route?.query?.callsign as string) ?? '',
    year: new Date().getFullYear()
  })

  // 搜索结果
  const searchData = ref<Search55V1Types.IResponse>({} as Search55V1Types.IResponse)

  // 奖项信息
  const awardData = ref<Award55V1Types.IResponse>({} as Award55V1Types.IResponse)

  /**
   * 搜索
   */
  const onSearch = async ({ callsign, year }: Partial<Search55V1Types.IRequest>) => {
    searchQuery.callsign = callsign ?? ''
    if (year) {
      searchQuery.year = year
    }

    const res = await search(searchQuery)

    searchData.value = res ?? {}
  }

  if (searchQuery.callsign) {
    onSearch(searchQuery)
  }

  /**
   * 获取奖项信息
   */
  const onAward = async ({ callsign, year }: Partial<Award55V1Types.IRequest>) => {
    searchQuery.callsign = callsign ?? ''
    if (year) {
      searchQuery.year = year
    }

    const res = await award(searchQuery)

    awardData.value = res ?? {}
  }

  if(searchQuery.callsign) {
    onAward(searchQuery)
  }

  return { searchQuery, onSearch, searchData , onAward, awardData}
})

// 使用方法参考 https://vueuse.org/shared/createInjectionState/
export { useHomeStore, useProvideHomeStore }
