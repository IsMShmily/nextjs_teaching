## nextjs 官方文档（current branch 对应如下文档）

- [动态路由（Dynamic Routes）](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)

- [路由组（Route Groups）](https://nextjs.org/docs/app/building-your-application/routing/route-groups)

- [平行路由（Parallel Routes）](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)

- [拦截路由（Intercepting Routes）](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)

---

## 一、动态路由（Dynamic Routes）

### 1、[folderName]

可以通过将文件夹名称括在方括号中来创建动态细分：`[folderName]`。例如，`[id]`或`[slug]` 。

例如，博客可以包含以下路线`app/blog/[slug]/page.tsx` ，其中`[slug]`是博客文章的动态段。

动态段作为 params 属性传递给`layout` 、 `page` 、 `route`和`generateMetadata`函数。

见：[app/blog/[slug]/page.tsx](app/blog/[slug]/page.tsx)

```tsx
const Blog = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <div>Blog: {slug}</div>;
};

export default Blog;
```

<img src="./assets/01.png" alt="" width="60%" />

我们可以看到 `slug` 的值为1 ，`slug`相当于一个`params`参数被`page`页面接收到了。

<img src="./assets/2.png" alt="" width="60%" />


### 2、[...folderName]
通过在括号`[...folderName]`内添加省略号，可以将动态段扩展为捕获所有后续段。

见：[app/shop/[...slug]/page.tsx](app/shop/[...slug]/page.tsx)

```tsx
const Shop = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  console.log(slug);
  return <div>Shop: {slug.toString()}</div>;
};

export default Shop;
```

<img src="./assets/04.png" alt="" width="60%" />
<img src="./assets/03.png" alt="" width="60%" />

### 3、[[...folderName]]
通过将参数包含在双方括号中，可以使 Catch-all Segment 成为可选项：`[[...folderName]]` 。

<img src="./assets/07.png" alt="" width="60%" />

看起来是不是和`[...folderName]`没什么区别，

其实`[[...folderName]]` 和 `[...folderName]`与`[folderName]` 的区别在于不在参数会不会报错

比如当我们不带参数访问 `/blog` 与 `/shop `如下

<img src="./assets/05.png" alt="" width="60%" />
<img src="./assets/06.png" alt="" width="60%" />

而如果我们访问 `/hotdog` 则不会报错，见 [app/hotdog/[[...slug]]/page.tsx](app/hotdog/[[...slug]]/page.tsx)
```tsx
const HotDog = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  console.log(slug);
  return <div>HotDog: {slug}</div>;
};

export default HotDog;
```
<img src="./assets/08.png" alt="" width="60%" />

## 二、路由组（Route Groups）

## 三、平行路由（Parallel Routes）

## 三、拦截路由（Intercepting Routes）
