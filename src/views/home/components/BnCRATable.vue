<script lang="ts" setup>
defineOptions({ name: 'BnCRATable' })
</script>

<template>
  <div class="flex justify-center py-4 bncra-table">
    <div class="p-6 rounded-lg bg-white border-2 border-gray-100 bncra-table-block">
      <h5 class="flex justify-between text-gray-900 text-xl leading-tight font-medium mb-2">
        <span>BnCRA</span>

        <span class="text-sm text-gray-500"> 0 分 </span>
      </h5>
      <div class="bncra-table-scroll">
        <table class="text-center">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4"></th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">160M</th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">80M</th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">40M</th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">30M</th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">20M</th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">17M</th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">15M</th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">12M</th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">10M</th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">6M</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PHONE</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium bg-gray-50 rounded-sm"
              ></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
            </tr>
            <tr class="bg-white border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CW</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
            </tr>
            <tr class="bg-white border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">DIGI</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (width <= 768px) {
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
      }
    }
  }
}
</style>
