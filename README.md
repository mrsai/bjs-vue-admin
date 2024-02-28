# bjs-vue-admin

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### 目录结构说明

**约定**
约定在开发中是一项非常重要的，可以大大的减少开发和维护成本，减少开发者和维护者的心智负担
1. views 中的模块和路由中的模块名称保持一致，这种一致性在开发
比如：你要新增一个dashboard模块，那么你在views新增一个dashboard文件夹作为页面组件，相应的你也要在routers/modules文件夹中增加dashboard.js 来配置路由地址。
2. 异步请求数据返回的格式一致性，
在axios拦截器中有一个数据接口返回格式的验证，可以验证数据返回的respons是否是统一的格式，默认的返回格式为
```{
  data:null,
  success:true,
  msg:''
}```

### 开发范式