<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

import { awardCert } from '@/api/55/search'

const { t } = useI18n()

const certNum = ref('')
const loading = ref(false)
const result = ref<AwardCert55V1Types.IResponse>()

const statusMessage = computed(() => {
  if (!result.value || result.value.valid) return ''
  if (!result.value.award?.cert_num) return t('certificate.notFound')
  return t('certificate.invalidHint')
})

const awardName = computed(() => {
  const name = result.value?.award?.award_string
  if (!name) return '-'
  return t(`home.award.awardString.${name}`)
})

const onQuery = async () => {
  const value = certNum.value.trim()
  if (!value) {
    ElMessage.warning(t('certificate.placeholder'))
    return
  }
  loading.value = true
  try {
    result.value = await awardCert({ cert_num: value })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="certificate-query">
    <div class="container mx-auto px-5">
      <div class="certificate-panel">
        <div class="certificate-search">
          <div>
            <h2>{{ t('certificate.title') }}</h2>
            <p>{{ t('certificate.desc') }}</p>
          </div>
          <div class="certificate-inputs">
            <input
              v-model="certNum"
              type="text"
              :placeholder="t('certificate.placeholder')"
              class="certificate-input"
              @keyup.enter="onQuery"
            />
            <button class="certificate-button" :disabled="loading" @click="onQuery">
              {{ loading ? t('certificate.loading') : t('certificate.query') }}
            </button>
          </div>
        </div>

        <div v-if="result" class="certificate-result">
          <div class="certificate-status" :class="result.valid ? 'is-valid' : 'is-invalid'">
            {{ result.valid ? t('certificate.valid') : t('certificate.invalid') }}
            <span v-if="statusMessage">{{ statusMessage }}</span>
          </div>

          <div class="certificate-info">
            <div><label>{{ t('certificate.certNum') }}</label><strong>{{ result.award?.cert_num || '-' }}</strong></div>
            <div><label>{{ t('certificate.year') }}</label><strong>{{ result.award?.year || '-' }}</strong></div>
            <div><label>{{ t('certificate.callsign') }}</label><strong>{{ result.award?.callsign || '-' }}</strong></div>
            <div><label>{{ t('certificate.award') }}</label><strong>{{ awardName }}</strong></div>
            <div><label>{{ t('certificate.continent') }}</label><strong>{{ result.award?.continent || '-' }}</strong></div>
            <div><label>{{ t('certificate.bncraNums') }}</label><strong>{{ result.award?.bncra_nums || 0 }}</strong></div>
          </div>

          <div class="logs-title">{{ t('certificate.logs') }} ({{ result.log_total || 0 }})</div>
          <el-table :data="result.logs || []" border max-height="520" class="logs-table">
            <el-table-column prop="station_callsign" :label="t('certificate.stationCallsign')" min-width="120" />
            <el-table-column prop="call_obj" :label="t('certificate.callsign')" min-width="110" />
            <el-table-column prop="mode" :label="t('certificate.mode')" width="90" />
            <el-table-column prop="band" :label="t('certificate.band')" width="90" />
            <el-table-column prop="qso_date" label="QSO Date" min-width="120" />
            <el-table-column prop="time_on" label="Time On" min-width="100" />
            <el-table-column prop="frequency" :label="t('certificate.frequency')" min-width="100" />
            <el-table-column prop="operator" :label="t('certificate.operator')" min-width="100" />
            <el-table-column :label="t('certificate.satellite')" min-width="120">
              <template #default="{ row }">{{ row.is_sat ? row.sat_name || 'SAT' : '-' }}</template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.certificate-query {
  padding: 0 0 48px;
}

.certificate-panel {
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}

.certificate-search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;

  h2 {
    margin: 0 0 6px;
    color: #111827;
    font-size: 22px;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: #6b7280;
    font-size: 14px;
  }
}

.certificate-inputs {
  display: flex;
  gap: 12px;
  flex: 1;
  justify-content: flex-end;
  min-width: min(100%, 420px);
}

.certificate-input {
  width: min(100%, 320px);
  height: 42px;
  padding: 0 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  outline: none;
}

.certificate-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgb(99 102 241 / 12%);
}

.certificate-button {
  height: 42px;
  padding: 0 20px;
  border: 0;
  border-radius: 6px;
  background: #6366f1;
  color: #fff;
  white-space: nowrap;
}

.certificate-button:disabled {
  opacity: 0.65;
}

.certificate-result {
  margin-top: 20px;
}

.certificate-status {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  font-weight: 600;

  span {
    color: #6b7280;
    font-weight: 400;
  }
}

.is-valid {
  color: #059669;
}

.is-invalid {
  color: #dc2626;
}

.certificate-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 20px;

  div {
    padding: 12px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    background: #f9fafb;
  }

  label {
    display: block;
    margin-bottom: 4px;
    color: #6b7280;
    font-size: 13px;
  }

  strong {
    color: #111827;
    font-size: 16px;
  }
}

.logs-title {
  margin-bottom: 12px;
  color: #111827;
  font-weight: 600;
}

.logs-table {
  width: 100%;
}

@media screen and (max-width: 768px) {
  .certificate-panel {
    padding: 16px;
  }

  .certificate-inputs {
    flex-direction: column;
  }

  .certificate-input,
  .certificate-button {
    width: 100%;
  }
}
</style>
