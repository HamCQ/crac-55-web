/*
 * @Description: 示例，counter单个模块store
 * @Author: BG7ZAG bg7zag@qq.com
 * @Date: 2023-08-11
 * @LastEditors: BG7ZAG bg7zag@qq.com
 * @LastEditTime: 2023-08-11
 */
import { createInjectionState } from '@vueuse/shared'
import { computed, ref } from 'vue'

const [useProvideCounterStore, useCounterStore] = createInjectionState((initialValue: number) => {
  // state
  const count = ref(initialValue)

  // getters
  const double = computed(() => count.value * 2)

  // actions
  function increment() {
    count.value++
  }

  return { count, double, increment }
})
// 使用方法参考 https://vueuse.org/shared/createInjectionState/
export { useCounterStore, useProvideCounterStore }
