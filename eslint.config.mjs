/*
 * ESLint 10 使用 flat config，.eslintrc.cjs 已不再支持
 */
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import {
  configureVueProject,
  defineConfigWithVueTs,
  vueTsConfigs
} from '@vue/eslint-config-typescript'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginVue from 'eslint-plugin-vue'

// 项目中有 <script lang="tsx"> 与 <script> 的 .vue 文件
configureVueProject({
  scriptLangs: ['js', 'ts', 'tsx', 'jsx']
})

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,js,jsx,vue}']
  },
  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/node_modules/**',
      '**/*.d.ts',
      'public/**'
    ]
  },
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
  {
    name: 'app/import-sort',
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      // 与旧配置（typescript-eslint v6 recommended）保持一致：any 只提示不阻断
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  }
)