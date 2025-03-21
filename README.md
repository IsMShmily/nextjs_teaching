## nextjs 官方文档（current branch 对应如下文档）

- [Link](https://nextjs.org/docs/app/api-reference/components/link)
- [useRouter](https://nextjs.org/docs/app/api-reference/functions/use-router)
- [Redirecting](https://nextjs.org/docs/app/building-your-application/routing/redirecting)

---

在 Next.js 中，有 3 种方式可以实现路由导航：

- 使用 `<Link>` 组件
- 使用 useRouter Hook（客户端组件）
- 使用 redirect 函数（服务端组件）

## 一、Link 组件

在 [app/layout.tsx](app/layout.tsx) 中我们可以看到,

`<Link>`是一个 React 组件，它扩展了 HTML` <a>` 元素，以提供路由之间的预取和客户端导航。它是 Next.js 中路由之间导航的主要方式。

```ts
...

{
  /* 路由跳转 */
}
<div className="flex gap-4">
  <Link href="/about/a" className="text-blue-500 hover:text-blue-600">
    AboutA
  </Link>
  <Link href="/about/b" className="text-blue-500 hover:text-blue-600">
    AboutB
  </Link>
</div>;
...
```

### 1、`Link`组件属性

<img src="assets/01.png" style="width:70%">

- href ： 要导航到的路径或 `URL`

- replace ： 默认为 `false` 。当为 `true` 时， `next/link` 将替换当前历史记录状态，而不是将新 URL 添加到浏览器的历史记录中堆。

- scroll ： 默认为 `true` ，当 `scroll = {false}` 时，`Next.js` 将不会尝试滚动到第一个页面元素。

- prefetch ： 当`<Link />`组件进入用户视口（初始或通过滚动）时，就会发生预取。 `Next.js` 会在后台预取并加载链接的路线（用 `href` 表示）及其数据，

### 2、`Link`支持动态渲染

```tsx
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  slug: string;
}

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
```

### 3、使用`usePathname`获取当前路径名

您可以使用 `usePathname()` 来确定链接是否处于活动状态。例如，要向活动链接添加类，您可以检查当前 `pathname` 是否与链接的 `href` 匹配，见：[app/about/layout.tsx](app/about/layout.tsx)

```tsx
"use client";
import { usePathname } from "next/navigation";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div>
      <h1 className={pathname === "/about/a" ? "text-green-500" : ""}>
        About Layout {pathname} ( /about/a 展示绿色)
      </h1>
      {children}
    </div>
  );
};

export default AboutLayout;
```

## 二、useRouter

useRouter 钩子允许你以编程方式更改客户端组件内的路由。见：[app/page.tsx](app/page.tsx)

```tsx
"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="border-2 border-yellow-500 w-100 h-100">
      {/* useRouter Hook 路由跳转 */}
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/blog/a")}
          className="text-blue-500 hover:text-blue-600"
        >
          BlogA
        </button>
        <button
          onClick={() => router.push("/blog/b")}
          className="text-blue-500 hover:text-blue-600"
        >
          BlogB
        </button>
      </div>
      hello next.js Home Page
    </div>
  );
}
```

```md
建议：使用<Link>组件进行导航，除非您对使用 `useRouter` 有特殊要求。
```

`router.back() `：导航回浏览器历史堆栈中的上一条路由。

`router.push(href: string, { scroll: boolean }) `：执行到所提供路线的客户端导航。在浏览器的历史记录中添加新条目堆。

`router.replace(href: string, { scroll: boolean }) `：执行到所提供路线的客户端导航，而无需在浏览器的历史记录堆栈中添加新条目。

`router.refresh() ：`刷新当前路由。向服务器发出新请求，重新获取数据请求，并重新渲染服务器组件。客户端将合并更新的 `React` 服务器组件有效负载，而不会丢失未受影响的客户端 `React`（例如 `useState` ）或浏览器状态（例如滚动位置）。

`router.prefetch(href: string) ：`预取提供的路由，以实现更快的客户端转换。

## 三、redirect 函数

redirect 功能允许您将用户重定向到另一个 URL。您可以在服务器组件、路由处理程序和服务器操作中调用 `redirect` 。

```md
默认情况下， redirect 返回 307（临时重定向）状态代码。在服务器操作中使用时，它会返回 303（参见其他），这通常用于在 `POST` 请求后重定向到成功页面。
```

demo 见：[app/redirect/page.jsx](app/redirect/page.jsx)

```ts
"use client";
import { usePathname, redirect } from "next/navigation";
import { useEffect } from "react";

const Redirect = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname == "/redirect") {
      setTimeout(() => {
        /** 两秒后重定向到 /about/a */
        redirect("/about/a");
      }, 2000);
    }
  }, []);

  return <div>Redirect</div>;
};

export default Redirect;
```
