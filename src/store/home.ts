/*
 * @Description: 首页
 * @Author: BG7ZAG bg7zag@qq.com
 * @Date: 2023-08-11
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditors: zyg0121 zhouyiguo2012@qq.com
 * @LastEditTime: 2023-08-30
 */
import { createInjectionState } from '@vueuse/shared'
import { dayjs, ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { award, search } from '@/api/55/search'

import { useConfigState } from './config'

const [useProvideHomeStore, useHomeStore] = createInjectionState(() => {
  const route = useRoute()

  // 呼号
  const searchQuery = reactive<Search55V1Types.IRequest>({
    callsign: (route?.query?.callsign as string) ?? '',
    year: ''
  })

  // 搜索结果
  const searchData = ref<Search55V1Types.IResponse>({} as Search55V1Types.IResponse)

  // 奖项信息
  const awardData = ref<Award55V1Types.IResponse>({} as Award55V1Types.IResponse)

  const { t } = useI18n()
  const { currentYear } = useConfigState()

  watch(currentYear, () => {
    onSearch({})
  })

  /**
   * 搜索
   */
  const onSearch = async ({ callsign }: Partial<Search55V1Types.IRequest>) => {
    searchQuery.callsign = callsign?.trim() || searchQuery.callsign
    if (!searchQuery.callsign) return

    searchQuery.year = currentYear.value ?? ''

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
    if (year || route.query.year) {
      searchQuery.year = (year || route.query.year) as string
    }

    const res = await award(searchQuery)

    awardData.value = res ?? {}
  }

  if (searchQuery.callsign) {
    onAward(searchQuery)
  }

  return { searchQuery, onSearch, searchData, onAward, awardData }
})

// 使用方法参考 https://vueuse.org/shared/createInjectionState/
export { useHomeStore, useProvideHomeStore }
