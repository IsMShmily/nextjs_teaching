## nextjs 官方文档（current branch 对应如下文档）

- [Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [path-to-regexp](https://github.com/pillarjs/path-to-regexp)

---

## 一、middleware 基本使用

中间件允许您在请求完成之前运行代码。然后，根据传入的请求，您可以通过重写、重定向、修改请求或响应标头或直接响应来修改响应。

使用项目根目录中的 `middleware.ts` 文件（或 `.js` ）来定义中间件。例如，与 `pages` 或 `app` 处于同一级别，或者在 `src` 内（如果适用）。

```md
注意 ：
虽然每个项目仅支持一个 middleware.ts 文件，但您仍然可以模块化地组织中间件逻辑。将中间件功能分解为单独的 .ts 或 .js 文件，然后将其导入主 middleware.ts 文件。这样可以更清晰地管理路由特定的中间件，这些中间件会汇总在 middleware.ts 中以便进行集中控制。通过强制使用单个中间件文件，可以简化配置、防止潜在冲突并通过避免多个中间件层来优化性能。
```

#### Example:

将 `/about/**` 所有路由访问重定向到 `/home`，见：[middleware.ts](middleware.ts)

```ts
import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  // 请求路由为 /about/** 重定向到 /home
  return NextResponse.redirect(new URL("/home", request.url));
};

/** 配置匹配路径 */
export const config = {
  matcher: "/about/:path*",
};
```

`matcher` 的语法参考 [path-to-regexp](https://github.com/pillarjs/path-to-regexp)

我们也可以不使用 `matcher`，而是在 `middleware` 中使用条件语句进行判断，见：[middleware.ts](middleware.ts)

```ts
import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  // 将 url 开头为 /about 的请求重定向到 /home
  if (request.nextUrl.pathname.startsWith("/about")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
};
```

## 二、在中间件中使用 Cookies

`Cookies` 是常规标头。在 `Request` 中，它们存储在 `Cookie` 标头中。在 `Response` 中，它们位于 `Set-Cookie` 标头中。`Next.js` 通过 `NextRequest` 和 `NextResponse` 上的 `cookies` 扩展提供了一种访问和操作这些 `cookie` 的便捷方法。

对于传入请求， `cookies` 具有以下方法：

- get
- getAll
- set
- delete cookies

您可以使用 `has` 检查 `cookie` 是否存在，或使用 `clear` 删除所有 `cookie。`

对于传出的响应， `cookies` 具有以下方法

- get
- getAll
- set
- delete

<img src="assets/01.png" style="width:60%">

```tsx
/** 二、中间件中使用 cookies */
export const middleware = (request: NextRequest) => {
  // cookie { name: 'vercel', value: '31321' }
  console.log(request.cookies.get("vercel"));

  /**
   * cookies [
   * { name: 'vercel', value: '31321' },
   * { name: 'nextjs', value: '333' }
   * ]
   */
  console.log(request.cookies.getAll());

  // true
  console.log("1、is has vercel ：", request.cookies.has("vercel"));

  request.cookies.delete("vercel");

  // false
  console.log("2、is has vercel ：", request.cookies.has("vercel"));

  /** 设置 cookie */
  const response = NextResponse.next();
  response.cookies.set("vercel", "333");
  response.cookies.set({
    name: "vercel",
    value: "333",
    path: "/",
  });
  console.log("3、vercel：", response.cookies.get("vercel"));

  return response;
};
```
<img src="./assets/02.png" style="width:60%">

## 三、

## 四、
