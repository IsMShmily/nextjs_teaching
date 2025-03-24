## nextjs 官方文档（current branch 对应如下文档）

[Server Components 服务端组件](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

[Incremental Static Regeneration 增量静态再生 ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)

## 一、CSR

CSR，英文全称“`Client-side Rendering`”，中文翻译“客户端渲染”。顾名思义，渲染工作主要在客户端执行。
定义：页面内容完全由浏览器端的 `JavaScript` 动态生成。

### 工作原理：

- 服务器返回一个空 `HTML` 框架
- 浏览器下载并执行 `JavaScript` 文件
- `JavaScript` 通过 `API` 请求数据并渲染内容

### 特点：

- 适合高度交互的 `Web` 应用
- `SEO` 不友好
- 首屏加载较慢

### 如何实现：

- 默认行为【不使用 `getStaticProps` 或 `getServerSideProps` （page Router）】
- 使用 `useEffect` + `useState` 获取数据

见：[app/csr/page.tsx](app/csr/page.tsx)

```ts
"use client";

import { useEffect, useState } from "react";

const CSR = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return <div>{data ? JSON.stringify(data) : "loading..."}</div>;
};

export default CSR;
```

我们可以看到发起了网络请求和 `loading...` ，数据在客户端中进行请求渲染

<img src="assets/02.png" style="width:60%">
<img src="assets/03.png" style="width:60%">

## 二、SSR

`SSR`，英文全称“`Server-side Rendering`”，中文翻译“服务端渲染”。顾名思义，渲染工作主要在服务端执行。

### 工作原理：

- 用户请求页面时，服务器实时生成 `HTML`
- 浏览器直接显示完整内容
- 后续交互仍由客户端 `JavaScript` 处理

### 特点：

- `SEO` 友好
- 首屏加载快
- 服务器压力较大
- `TTFB`（`Time to First Byte`）可能较长

### 如何实现：

在 `App router` 中使用 "`use server`" 标记为 服务端组件

在 `Page router` 中使用 `getServerSideProps` 函数，每次请求都会执行服务端渲染

见：[app/ssr/page.tsx](app/ssr/page.tsx)

```tsx
const SSR = async () => {
  const getData = async () => {
    "use server";
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    return data;
  };

  const data = await getData();
  return <div>{data && JSON.stringify(data)}</div>;
};

export default SSR;
```

我们可以看到并没有发起网络请求和 `loading...` ，数据在服务端就已经准备好了

<img src="assets/01.png" style="width:60%">

## 三、SSG

`SSG`，英文全称“`Static Site Generation`”，中文翻译“静态站点生成”，在构建时（`build time`）预先生成静态 `HTML` 文件。

### 工作原理：

- 构建阶段生成静态 `HTML/CSS/JS`
- 直接通过 `CDN` 快速分发
- 数据更新需要重新构建

### 特点：

- 极致性能（`CDN` 缓存）
- 高安全性（无服务端运行时）
- 不适合频繁更新内容

### 实现：

- 使用 `getStaticProps`（动态数据）
- 不需要获取数据时，默认使用 `SSG`

修改 [next.config.ts](next.config.ts) 与 [app/ssr/page.tsx](app/ssr/page.tsx)

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
};

export default nextConfig;
```

```base
pnpm run build
```

我们可以在 [out](out) 文件夹找到构建生成的静态资源

<img src="assets/04.png" style="width:60%">


```tsx
/**
 * generateStaticParams
 * 该函数可以与动态路由段结合使用，在构建时静态生成路由，而不是在请求时按需生成。
 *
 * 取代了 Pages Router 中的 getStaticPaths 函数。
 */
export const generateStaticParams = async () => {
  // 在构建时获取所有文章数据
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  // 将文章数据转换为路由参数格式
  // 返回一个包含所有可能的 id 值的数组
  return posts.map((post: { id: { toString: () => any } }) => ({
    id: post.id.toString(), // 确保 id 是字符串格式
  }));
};

/**
 * 页面组件，接收动态路由参数
 * @param params - 包含路由参数的对象，这里是 { id: string }
 */
const Ssg3 = async ({ params }: { params: { id: string } }) => {
  // 解构获取路由参数中的 id
  const { id } = await params;

  // 根据 id 获取具体的文章数据
  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  ).then((res) => res.json());

  // 渲染文章内容
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default Ssg3;
```

## 四、ISR
