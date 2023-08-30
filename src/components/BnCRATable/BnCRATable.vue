<script lang="tsx" setup>
import { DoubleLeft } from '@icon-park/vue-next'
import { ElTooltip } from 'element-plus'

import BnCRAIcon from './BnCRAIcon.vue'

defineOptions({ name: 'BnCRATable' })

const props = defineProps<{
  formData: Search55V1Types.IResponse['bncra']
}>()

/**
 * 获取心Dom
 */
const GetHeartDom = (_props: any) => {
  const item = (props.formData as any)?.[_props.mode]?.[_props.band]
  if (!item) return null

  const QsoList = item.map((n: any) => (
    <div>
      {n.frequecy} {n.oprator}
    </div>
  ))
  return (
    <ElTooltip
      class="box-item text-center"
      effect="dark"
      placement="bottom"
      v-slots={{
        content: () => QsoList
      }}
    >
      <BnCRAIcon />
    </ElTooltip>
  )
}

const bands = ['160M', '80M', '40M', '30M', '20M', '17M', '15M', '12M', '10M', '6M']
</script>

<template>
  <div class="flex justify-center py-4 bncra-table">
    <div class="p-6 rounded-lg bg-white border-2 border-gray-100 bncra-table-block">
      <h5 class="flex justify-between text-gray-900 text-xl leading-tight font-medium mb-2">
        <span>{{ formData.callsign_station ?? 'BnCRA' }}</span>

        <span class="text-sm text-gray-500">
          {{ formData?.score ?? 0 }} {{ $t('home.points') }}
        </span>
      </h5>
      <div class="bncra-table-scroll">
        <table class="text-center">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4"></th>
              <th
                scope="col"
                class="text-sm font-medium text-gray-900 px-6 py-4"
                v-for="i in bands"
                :key="i"
              >
                {{ i }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PHONE</td>
              <td
                :class="[
                  'px-6 py-4 whitespace-nowrap text-sm font-medium ',
                  i === '30M' ? 'bg-gray-50 rounded-sm' : 'text-gray-900'
                ]"
                v-for="i in bands"
                :key="i"
              >
                <GetHeartDom v-if="i !== '30M'" mode="phone" :band="i" />
              </td>
            </tr>
            <tr class="bg-white border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CW</td>
              <td
                :class="['px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900']"
                v-for="i in bands"
                :key="i"
              >
                <GetHeartDom mode="cw" :band="i" />
              </td>
            </tr>
            <tr class="bg-white border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">DIGI</td>
              <td
                :class="['px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900']"
                v-for="i in bands"
                :key="i"
              >
                <GetHeartDom mode="digi" :band="i" />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="bncra-tips">
          <div class="flex items-center text-sm bncra-tip-item">
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
  display: flex;
  justify-content: center;
}

.bncra-tips {
  display: none;
}

/* stylelint-disable-next-line media-feature-range-notation */
@media screen and (max-width: 992px) {
  .bncra-table {
    max-width: calc(100vw - 1.5rem);

    .bncra-table-block {
      max-width: 100%;

      > .bncra-table-scroll {
        max-width: 100%;
        overflow-x: auto;

        > table {
          width: fit-content;
        }

        .bncra-tips {
          display: flex;
          margin: 8px 0;

          .bncra-tip-item {
            padding-left: calc(50vw - 7em);
          }
        }
      }
    }
  }
}
</style>
