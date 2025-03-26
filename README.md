## nextjs 官方文档（current branch 对应如下文档）

- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [server-components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

---

## 一、Client Components 客户端组件

客户端组件允许您编写在服务器上预渲染的交互式 `UI` 并且可以使用客户端 `JavaScript` 在浏览器中运行。

本页将介绍客户端组件的工作原理、如何呈现以及何时使用它们。

在客户端进行渲染工作有几个好处，包括：

- 交互性 ：客户端组件可以使用状态、效果和事件监听器，这意味着它们可以向用户提供即时反馈并更新 `UI`。
- 浏览器 API ：客户端组件可以访问浏览器 `API`，例如地理位置或 `localStorage` 。

"`use client`" 用于声明服务器和客户端组件模块之间的边界 。这意味着，通过在文件中定义 "`use client`" ，导入到其中的所有其他模块（包括子组件）都被视为客户端包的一部分。

见：[app/page.tsx](app/page.tsx)

```tsx
"use client";

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

下图显示，如果未定义 "`use client`" 指令，则在嵌套组件 ( `toggle.js` ) 中使用 `onClick` 和 `useState` 将导致错误。这是因为默认情况下，应用路由器中的所有组件都是服务器组件，这些 `API` 不可用。通过在 `toggle.js` 中定义 "`use client`" 指令，您可以告诉 `React` 进入这些 `API` 可用的客户端边界。

<img src="assets/01.png" style="width:60%">

<br />

#### 结论：

- 1、客户端组件可以使用浏览器的 API 而 服务端组件不可以
- 2、使用 use client 标记的组件定义为客户端组件，导入到其中的所有其他模块（包括子组件）都被视为客户端包的一部分。
