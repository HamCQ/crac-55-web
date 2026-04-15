<script lang="ts" setup>
import { DoubleLeft } from '@icon-park/vue-next'

import BnCRAIcon from '@/components/BnCRATable/BnCRAIcon.vue'

defineOptions({ name: 'SatTable' })

const props = defineProps<{
  formData: Search55V1Types.SatItem | undefined
}>()

const bxcraKeys: (keyof Search55V1Types.SatItem['ao_123'])[] = [
  'b0cra',
  'b1cra',
  'b2cra',
  'b3cra',
  'b4cra',
  'b5cra',
  'b6cra',
  'b7cra',
  'b8cra',
  'b9cra'
]

const satellites: { label: string; key: keyof Omit<Search55V1Types.SatItem, 'callsign_station' | 'score'> }[] = [
  { label: 'AO-123', key: 'ao_123' },
  { label: 'SO-50', key: 'so_50' },
  { label: 'ISS', key: 'iss' },
  { label: 'RS-44', key: 'rs_44' }
]
</script>

<template>
  <div class="flex justify-center py-4 sat-table">
    <div class="p-6 rounded-lg bg-white border-2 border-gray-100 sat-table-block">
      <h5 class="flex justify-between text-gray-900 text-xl leading-tight font-medium mb-2">
        <span>{{ $t('home.sat.title') }}</span>
        <span class="text-sm text-gray-500">
          {{ formData?.score ?? 0 }} {{ $t('home.points') }}
        </span>
      </h5>
      <div class="sat-table-scroll">
        <table class="text-center">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-3 py-3"></th>
              <th
                v-for="key in bxcraKeys"
                :key="key"
                scope="col"
                class="text-sm font-medium text-gray-900 px-2 py-3"
              >
                {{ key.toUpperCase() }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="sat in satellites"
              :key="sat.key"
              class="bg-white border-b"
            >
              <td class="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ sat.label }}
              </td>
              <td
                v-for="bxcra in bxcraKeys"
                :key="bxcra"
                class="px-2 py-3 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                <BnCRAIcon v-if="formData?.[sat.key]?.[bxcra] != null" />
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
.sat-table-block {
  width: fit-content;
}

.sat-tips {
  display: none;
}

/* stylelint-disable-next-line media-feature-range-notation */
@media screen and (max-width: 992px) {
  .sat-table {
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
