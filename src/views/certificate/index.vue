<script lang="ts" setup>
import CertificateQuery from '../home/components/CertificateQuery.vue'

defineOptions({ name: 'CertificateQueryPage' })
</script>

<template>
  <main class="certificate-page">
    <CertificateQuery />
  </main>
</template>

<style lang="scss" scoped>
.certificate-page {
  flex: 1;
  padding-top: 48px;
}
</style>
