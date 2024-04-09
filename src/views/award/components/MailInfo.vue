<!-- 第三部邮寄信息 -->
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { useI18n } from 'vue-i18n'

import { isPhone } from '@/utils'

defineOptions({ name: 'MailInfo' })

const { t } = useI18n()

export interface RuleForm {
  name: string
  phone: string
  address: string
  collectionAgent: string
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  phone: '',
  address: '',
  collectionAgent: ''
})

function validatorPhone(rule: any, value: string, callback: any) {
  if (!value) {
    callback(new Error(t('award.pleaseEnter')))
  } else if (!isPhone(value)) {
    callback(new Error(t('award.pleaseEnterPhone')))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: t('award.pleaseEnter'), trigger: 'blur' }],
  phone: [{ required: true, validator: validatorPhone, trigger: 'blur' }],
  address: [{ required: true, message: t('award.pleaseEnter'), trigger: 'blur' }]
})

const emits = defineEmits<{
  submit: [val: RuleForm]
}>()

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      emits('submit', ruleForm)
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<template>
  <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="mail-info mt-5"
    status-icon
    label-position="top"
  >
    <el-form-item>
      <el-col :span="11">
        <el-form-item :label="t('award.userName')" prop="name">
          <el-input v-model="ruleForm.name" :placeholder="t('award.pleaseEnter')" />
        </el-form-item>
      </el-col>

      <el-col :span="11" :offset="2">
        <el-form-item :label="t('award.phone')" prop="phone">
          <el-input v-model="ruleForm.phone" :placeholder="t('award.pleaseEnter')" />
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-form-item :label="t('award.address')" prop="address">
      <el-input
        v-model="ruleForm.address"
        :rows="4"
        type="textarea"
        :placeholder="t('award.pleaseEnter')"
      />
    </el-form-item>

    <el-form-item :label="t('award.bindCollectionAgent')">
      <div class="mb-3">
        <p class="leading-tight">{{ t('award.bindCollectionAgentInfo') }}</p>
        <p class="leading-tight">{{ t('award.bindCollectionAgentInfo2') }}</p>
      </div>
      <el-input v-model="ruleForm.collectionAgent" :placeholder="t('award.collectionAgent')" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">{{ t('award.submit') }}</el-button>
    </el-form-item>
  </el-form>
</template>
