/*
 * @Description:
 * @Author: BG7ZAG bg7zag@qq.com
 * @Date: 2023-08-11
 * @LastEditors: BG7ZAG bg7zag@qq.com
 * @LastEditTime: 2023-08-17
 */
/**
 * @type {import('stylelint').Config}
 */
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-recess-order'
  ],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global', 'local']
      }
    ],
    'selector-class-pattern': [
      '^([a-z0-9]|_|-)*$',
      {
        message: 'class 只能以 小写字母,数字, -, _ 进行命名'
      }
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['v-bind']
      }
    ],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'function',
          'if',
          'each',
          'include',
          'mixin'
        ]
      }
    ],
    'media-feature-range-notation': null
  }
}
