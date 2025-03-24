## 一、CSR

CSR，英文全称“`Client-side Rendering`”，中文翻译“客户端渲染”。顾名思义，渲染工作主要在客户端执行。
定义：页面内容完全由浏览器端的 `JavaScript` 动态生成。

#### 工作原理：

- 服务器返回一个空 `HTML` 框架
- 浏览器下载并执行 `JavaScript` 文件
- `JavaScript` 通过 `API` 请求数据并渲染内容

#### 特点：

- 适合高度交互的 `Web` 应用
- `SEO` 不友好
- 首屏加载较慢

#### 如何实现：

- 默认行为（不使用 `getStaticProps` 或 `getServerSideProps`）
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

## 二、SSR

## 三、SSG

## 四、ISR
