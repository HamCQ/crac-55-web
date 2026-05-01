<!-- 业余卫星状态表格 -->
<script lang="ts" setup>
import { DoubleLeft } from '@icon-park/vue-next'
import { ElTooltip } from 'element-plus'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import BnCRAIcon from '@/components/BnCRATable/BnCRAIcon.vue'

defineOptions({ name: 'SatTable' })

const props = defineProps<{
  satData: SlotSatTypes.IResponse
}>()

const { t } = useI18n()

const bncraList = [
  'B0CRA',
  'B1CRA',
  'B2CRA',
  'B3CRA',
  'B4CRA',
  'B5CRA',
  'B6CRA',
  'B7CRA',
  'B8CRA',
  'B9CRA'
]

const defaultSatList = ['AO-123', 'SO-50', 'ISS', 'RS-44']

const satList = computed(() => {
  const fromApi = Object.keys(props.satData)
  const merged = [...defaultSatList]
  for (const sat of fromApi) {
    if (!merged.includes(sat)) {
      merged.push(sat)
    }
  }
  return merged
})

const entryMap = computed(() => {
  const map: Record<string, Record<string, SlotSatTypes.ISatEntry>> = {}
  for (const sat of satList.value) {
    map[sat] = {}
  }
  for (const [sat, entries] of Object.entries(props.satData)) {
    for (const entry of entries) {
      if (!map[sat][entry.bncra]) {
        map[sat][entry.bncra] = entry
      }
    }
  }
  return map
})

const formatFreq = (freq: number | null) => {
  if (!freq) return ''
  return (freq / 1000).toFixed(3) + ' MHz'
}
</script>

<template>
  <div class="flex justify-center py-4 sat-table-outer">
    <div class="p-6 rounded-lg bg-white border-2 border-gray-100 sat-table-block">
      <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">
        {{ t('home.sat.title') }}
      </h5>
      <div class="sat-table-scroll">
        <table class="text-center">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-4 py-3"></th>
              <th
                scope="col"
                class="text-sm font-medium text-gray-900 px-4 py-3"
                v-for="b in bncraList"
                :key="b"
              >
                {{ b }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sat in satList" :key="sat" class="bg-white border-b">
              <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ sat }}
              </td>
              <td
                class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900"
                v-for="b in bncraList"
                :key="b"
              >
                <ElTooltip
                  v-if="entryMap[sat]?.[b]"
                  class="box-item text-center"
                  effect="dark"
                  placement="bottom"
                >
                  <template #content>
                    <div>{{ entryMap[sat][b].callsign }} {{ entryMap[sat][b].time }}</div>
                    <div v-if="entryMap[sat][b].frequency">
                      {{ formatFreq(entryMap[sat][b].frequency) }}
                    </div>
                  </template>
                  <BnCRAIcon />
                </ElTooltip>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="sat-tips">
          <div class="flex items-center text-sm sat-tip-item">
            <DoubleLeft />
            左滑查看更多
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-tooltip__trigger) {
  display: inline-flex;
}

.sat-tips {
  display: none;
}

/* stylelint-disable-next-line media-feature-range-notation */
@media screen and (max-width: 992px) {
  .sat-table-outer {
    max-width: calc(100vw - 1.5rem);

    .sat-table-block {
      max-width: 100%;

      > .sat-table-scroll {
        max-width: 100%;
        overflow-x: auto;

        > table {
          width: fit-content;
        }

        .sat-tips {
          display: flex;
          margin: 8px 0;

          .sat-tip-item {
            padding-left: calc(50vw - 7em);
          }
        }
      }
    }
  }
}
</style>
