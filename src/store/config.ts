import { createGlobalState } from '@vueuse/shared'
import { dayjs } from 'element-plus'

import { config55 } from '@/api/55/config'

/**
 * 获取配置
 */
export const useConfigState = createGlobalState(() => {
  const config = ref<Config55Types.IResponse>({} as Config55Types.IResponse)

  /**
   * 当前选择年份 时间戳
   */
  const currentYear = ref<string>()

  /**
   * 获取配置
   * @param year 年份
   */
  const getConfig = async () => {
    const res = await config55({
      year: currentYear.value ? currentYear.value : dayjs().get('y')
    })
    config.value = res ?? {}

    if (!currentYear.value && res.current_active_year) {
      currentYear.value = res.current_active_year?.toString()
    }
  }
  getConfig()

  /**
   * 切换年
   * @param year 时间戳
   */
  const changeYear = (year: string) => {
    currentYear.value = year
    getConfig()
  }

  /**
   * 禁止选择的年份
   */
  const disabledDate = (time: Date) => {
    return time.getFullYear() < 2022 || time.getFullYear() > new Date().getFullYear()
  }

  return { config, getConfig, currentYear, changeYear, disabledDate }
})
