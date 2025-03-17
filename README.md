### nextjs 官方文档（current branch 对应如下文档）
- https://nextjs.org/docs/app/getting-started/installation
- https://nextjs.org/docs/app/getting-started/project-structure
- https://nextjs.org/docs/app/getting-started/layouts-and-pages

--- 

### 一、如何创建router

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
```yaml
# 如app目录下 
app/about/page.tsx   ->   http://localhost:3000/about
app/blog/page.tsx    ->   http://localhost:3000/blog
```

### layout
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
### 三、templage

