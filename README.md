## Next.js 教学

`Next.js` 是基于 `React` 的全栈框架，专为构建高性能、`SEO` 友好的现代 `Web` 应用设计。

核心优势：

- 服务端渲染 (`SSR`) 和 静态站点生成 (`SSG`)：提升加载速度和 `SEO`。

- 内置路由系统：文件即路由，无需手动配置。

- `API` 路由：轻松创建后端接口。

- `TypeScript` 支持、`CSS Modules`、图像优化等开箱即用功能。

## 一、运行

```bash
# 下载依赖
npm i

# 运行项目
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

打开 [http://localhost:3000](http://localhost:3000)用你的浏览器查看结果。

## 二、学习目录

### 1、`next.js `基础

- **test_01/page_layout_template_loading**
  - 文件系统、page、layout、template、loading 组件介绍
- **test_01/layout_template_status_demo**
  - layout 与 template 组件的区别 `dmeo`

---

### 2、`<Link>`与`useRouter` 介绍

- **test_02/link_useRouter**
  - link、useRoouter、redirect 的使用

---

### 3、`next routes` 介绍

- **test_03/routes_detail**
  - 动态路由、路由组、平行路由、拦截路由讲解
- **test_03/InterceptingRoutes_demo**
  - 拦截路由 `demo`

---

### 4、`Route Handlers`的使用

- **test_04/route_handlers**
  - 约定
  - Request Method 的使用
  - 获取请求参数
  - 常见问题

---

### 5、`Middleware` 的使用与介绍

- **test_05/Middleware**
  - Middleware 的使用
  - Middleware Cookies 的使用
  - Middleware Headers 的使用
  - Middleware CORS 的使用
  - Middleware 如何响应

---

### 6、`Nextjs` 中的 `CSR、SSR、SSG、ISR` 的使用与介绍

- **test_06/CSR_SSR_SSG_ISR**
  - CSR 的使用
  - SSR 的使用
  - SSG 的使用
  - ISR 的使用

---
