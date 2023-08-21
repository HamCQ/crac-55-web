/*
 * @Description: 分页
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-20
 * @LastEditors: BG7ZAG bg7zag@qq.com
 * @LastEditTime: 2023-08-21
 */

interface Config {
  success?: () => void
}

/**
 * 用于分页数据查询
 * @param query 请求入参
 * @param fn 请求方法
 * @returns
 */
export const useQueryWithPagination = <T extends object, S>(
  query: T,
  fn: (x: T) => Promise<IBaseHttp.IPaginationResponse<S>>,
  config?: Config
) => {
  const loading = ref(false)
  // 首次成功响应
  const initialLoaded = ref(false)

  const list: Ref<S[]> = ref([]) as Ref<S[]>
  const limit = reactive({
    page_size: parseInt(import.meta.env.VITE_PAGE_SIZE),
    page: 1,
    total: 0,
    showQuickJumper: true,
    hideOnSinglePage: true
  })

  /**
   * 获取列表
   */
  const getList = async (_limit?: IBaseHttp.IPaginationRequest) => {
    loading.value = true
    try {
      const { data, total } = await fn({
        ...query,
        page: _limit?.page ?? limit.page,
        page_size: _limit?.page_size ?? limit.page_size
      })
      list.value = data ?? ([] as NonNullable<S>)
      limit.total = total ?? 0

      limit.page = _limit?.page ?? limit.page
      limit.page_size = _limit?.page_size ?? limit.page_size

      // 是否首次调用
      if (!initialLoaded.value) {
        initialLoaded.value = true
      }

      // 成功响应后回调
      config?.success?.()
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  // 监听分页变化
  watch([() => limit.page, () => limit.page_size], ([page, page_size], [_oldPage, oldPageSize]) => {
    if (page_size != oldPageSize) {
      limit.page = 1
      limit.page_size = page_size
    } else {
      limit.page = page
    }
    list.value = [] as S[]
    getList()
  })

  return {
    loading: readonly(loading),
    list: list,
    limit: limit,
    getList,
    initialLoaded: initialLoaded
  }
}
