## nextjs 官方文档（current branch 对应如下文档）

[environment-variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

---

<img src="assets/05.png" style="width:70%">

## 一、如何使用 环境变量

`Next.js` 内置了对环境变量的支持，可让您执行以下操作：

- 使用 `.env` 加载环境变量
- 通过添加 NEXT*PUBLIC* 前缀来捆绑浏览器的环境变量

`Next.js` 内置支持将环境变量从 `.env` 文件加载到 `process.env` 中。

见：[.env](.env)

```base
DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword
```

我们可以在服务端组件或者路由处理程序中通过 `process.env` 获取到该值,见：[app/page.tsx](app/page.tsx)

```ts
export default function Home() {
  console.log(process.env.DB_USER);
  return (
    <div className="border-2 border-yellow-500 w-100 h-100">
      hello next.js Home Page
    </div>
  );
}
```
