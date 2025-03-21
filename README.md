## nextjs 官方文档（current branch 对应如下文档）

- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

路由处理程序允许您使用 `Web` 请求为给定路由创建自定义请求处理程序和响应

```md
需要了解：路由处理程序仅在 `app` 目录中可用。它们相当于 `pages` 目录中的 `API` 路由，这意味着您不需要同时使用 `API` 路由和路由处理程序。
```

### 1、约定

路由处理程序在 `app` 目录内的 `route.js|ts` 文件中定义：[app/api/posts/route.ts](app/api/posts/route.ts)

路由处理程序可以嵌套在 `app` 目录中的任何位置，类似于 `page.js` 和 `layout.js` 。但不能在与 `page.js` 相同的路由段级别上存在 `route.js` 文件。

以下 HTTP 方法支持以下方法： `GET` 、 `POST` 、 `PUT` 、 `PATCH` 、 `DELETE` 、 `HEAD` 和 `OPTIONS` 。如果调用了不受支持的方法，`Next.js` 将返回 `405 Method Not Allowed` 响应。

### 2、GET 请求

我们从 GET 请求开始，现在写一个获取文章列表的几口

```ts
import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  return NextResponse.json(data);
};
```

浏览器访问 `http://localhost:3000/api/posts` 查看接口返回的数据：
