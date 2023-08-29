import { createGlobalState } from '@vueuse/shared'
import { useRoute } from 'vue-router'

import { config55 } from '@/api/55/config'

/**
 * 获取配置
 */
export const useConfigState = createGlobalState(() => {
  const route = useRoute()

  const config = ref<Config55Types.IResponse>({} as Config55Types.IResponse)

  /**
   * 获取配置
   * @param year 年份
   */
  const getConfig = async (year?: string) => {
    const res = await config55({ year: year || (route.query.year as string) })
    config.value = res ?? {}
  }
  getConfig()

  return { config, getConfig }
})
