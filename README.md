## nextjs 官方文档（current branch 对应如下文档）

[Server Components](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

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

## 四、ISR
