## nextjs 官方文档（current branch 对应如下文档）
- [How to set up a new Next.js project](https://nextjs.org/docs/app/getting-started/installation)
- [Project structure and organization](https://nextjs.org/docs/app/getting-started/project-structure)
- [How to create layouts and pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)

--- 

## 一、如何创建router

Next.js 使用基于文件系统的路由，这意味着您可以使用文件夹和文件来定义路由。
next.js 约定 使用 page.(js、.jsx、.tsx) 命名为页面

page.js中的代码和平时写react代码一样，例如 [app/page.tsx](app/page.tsx)
```ts
export default function Home() {
  return (
    <div className="border-2 border-yellow-500 w-100 h-100">
      hello next.js Home Page
    </div>
  );
}

```
当我们运行

```base
npm i 
npm run dev
```
  
  打开浏览器访问 http://localhost:3000/about 可以看到，about和blog渲染了其目录下的page.tsx的内容

```yaml
# 如app目录下 
app/about/page.tsx   ->   http://localhost:3000/about
app/blog/page.tsx    ->   http://localhost:3000/blog
```

## 二、layout
### 1、app/layout
app/layout为所有页面根布局，所有的页面都会展示该layout中的内容

该组件应接收一个 children prop，chidren 表示子布局（如果有的话）或者子页面。[app/layout.tsx](app/layout.tsx)
```ts
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
            ...
            ...
          {/* 子组件 这里的children 表示子页面 app/page.tsx */}
          {children}
        </div>
      </body>
    </html>
  );
}
```
- app 目录必须包含根布局，也就是 app/layout.js 这个文件是必需的。
- 根布局必须包含 html 和 body标签，其他布局不能包含这些标签。
- 默认根布局是服务端组件，且不能设置为客户端组件
- 你可以使用路由组创建多个根布局。


### 2、其他页面中的layout
[app/about/layout.tsx](app/about/layout.tsx)

当我们访问 http://localhost:3000/about ，
会展示 app/layout 和 about/layout中的布局，我们可以看到layout是相互嵌套的

```base
Main Layout

    About Layout

    About
```



