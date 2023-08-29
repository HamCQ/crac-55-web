# CRAC-55-WEB

纪念“5.5中国业余无线电节”空中通联活动站点

自1940年起，每年的5月5日就成为我国业余无线电爱好者的节日——“5·5中国业余无线电节”。

## 项目信息

本项目基于 Vue 3.x + Vite 开发，使用 TypeScript 开发。

## 建议的IDE设置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## 自定义配置

请查看 [Vite Configuration Reference](https://vitejs.dev/config/).

## 开始

```sh
pnpm install
```

### 编译和热重新加载以进行开发

```sh
pnpm run dev
```

### 打包生成

```sh
# develop
pnpm run build:dev
# test
pnpm run build:test
# prod
npm run build:prod
```

### [Vitest](https://vitest.dev/) 单元测试

```sh
pnpm run test:unit
```

### [ESLint](https://eslint.org/) 检测

```sh
pnpm run lint
```

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `perf` 优化/性能提升
  - `style` 代码风格相关无影响运行结果的

## 许可

[MulanPSL2](./LICENSE)
