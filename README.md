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

- **[test_01/page_layout_template_loading](https://github.com/IsMShmily/nextjs_teaching/tree/test_01/page_layout_template_loading)**
  - 文件系统、page、layout、template、loading 组件介绍
- **[test_01/layout_template_status_demo](https://github.com/IsMShmily/nextjs_teaching/tree/test_01/layout_template_status_demo)**
  - layout 与 template 组件的区别 dmeo

---

### 2、`<Link>`与`useRouter` 介绍

- **[test_02/link_useRouter](https://github.com/IsMShmily/nextjs_teaching/tree/test_02/link_useRouter?tab=readme-ov-file)**
  - link、useRoouter、redirect 的使用

---

### 3、`next routes` 介绍

- **[test_03/routes_detail](https://github.com/IsMShmily/nextjs_teaching/tree/test_03/routes_detail?tab=readme-ov-file)**
  - 动态路由、路由组、平行路由、拦截路由讲解
- **[test_03/InterceptingRoutes_demo](https://github.com/IsMShmily/nextjs_teaching/tree/test_03/InterceptingRoutes_demo?tab=readme-ov-file)**
  - 拦截路由 demo

---

### 4、`Route Handlers`的使用

- **[test_04/route_handlers](https://github.com/IsMShmily/nextjs_teaching/tree/test_04/route_handlers?tab=readme-ov-file)**
  - 约定
  - Request Method 的使用
  - 获取请求参数
  - 常见问题

---

### 5、`Middleware` 的使用与介绍

- **[test_05/Middleware](https://github.com/IsMShmily/nextjs_teaching/tree/test_05/Middleware?tab=readme-ov-file)**
  - Middleware 的使用
  - Middleware Cookies 的使用
  - Middleware Headers 的使用
  - Middleware CORS 的使用
  - Middleware 如何响应

---

### 6、`Nextjs` 中的 `CSR、SSR、SSG、ISR` 的使用与介绍

- **[test_06/CSR_SSR_SSG_ISR](https://github.com/IsMShmily/nextjs_teaching/tree/test_06/CSR_SSR_SSG_ISR?tab=readme-ov-file)**
  - CSR 的使用
  - SSR 的使用
  - SSG 的使用
  - ISR 的使用

---

### 7、`Nextjs` 中的 `Server Component` 与 SSR

- **[test_07/serverComponent_SSR](https://github.com/IsMShmily/nextjs_teaching/tree/test_07/serverComponent_SSR?tab=readme-ov-file)**
  - React Server Components (RSC)
  - use client 指令
  - React 服务器组件渲染生命周期

---

### 8、`Streaming` 流式传输

- **[test_08/suspense_streaming](https://github.com/IsMShmily/nextjs_teaching/tree/test_08/suspense_streaming?tab=readme-ov-file)**
  - 传统 SSR
  - 如何实现 Streaming 流式传输
    - 使用 Suspense 标签
    - 使用 loading 页面组件

---

### 9、`Nextjs`中的 服务端组件 与 客户端组件

- **[test_09/clientCompoent](https://github.com/IsMShmily/nextjs_teaching/tree/test_09/clientComponent)**
  - 客户端组件
    - 使用 Client Components
    - Client Components 如何呈现
  - 如何使用 Client Component
    - 基本使用
    - 最佳实践
  - 服务端组件 VS 客户端组件

---

### 10、`Nextjs` 中的 服务端渲染策略

- **[text_10/server_renderer_tactics](https://github.com/IsMShmily/nextjs_teaching/tree/text_10/server_renderer_tactics)**
  - 静态渲染
  - 动态渲染
  - 局部渲染

---

### 11、`Nextjs` Server Actions 使用 (上)

- **[test_11/server_actions](https://github.com/IsMShmily/nextjs_teaching/tree/test_11/server_actions)**
  - 基本用法
  - 使用 Server Actions 实现 TODOList

---

### 12、`Nextjs` Server Actions 使用 (下)

- **[test_12/server_actions_01](https://github.com/IsMShmily/nextjs_teaching/tree/test_11/server_actions)**

---
