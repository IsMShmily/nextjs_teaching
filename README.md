## nextjs 官方文档（current branch 对应如下文档）

- [what-is-streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#what-is-streaming)
- [with-suspense](https://nextjs.org/docs/app/getting-started/fetching-data#with-suspense)

---

## 一、传统 SSR

使用 SSR，用户需要完成一系列步骤才能看到页面并与之交互：

- 首先，在服务器上获取给定页面的所有数据。
- 然后服务器呈现该页面的 HTML。
- 页面的 HTML、CSS 和 JavaScript 被发送到客户端。
- 使用生成的 HTML 和 CSS 显示非交互式用户界面。
- 最后，React 水合用户界面，使其具有交互性。

<img src="assets/01.png" style="width:70%">

这些步骤是连续且阻塞的，这意味着服务器只有在获取所有数据后才能呈现页面的 HTML。而且，在客户端上，React 只有在下载完页面中所有组件的代码后才能补充 UI。

通过 React 和 Next.js 的 SSR，可以尽快向用户显示非交互式页面，从而帮助提高感知的加载性能。

<img src="assets/02.png" style="width:70%">

然而，它仍然很慢，因为在向用户显示页面之前需要完成服务器上的所有数据提取。

## 二、实现 stream 流式传输

### 1、通过 Suspense 标签实现

通过流式传输 ，您可以将页面的 HTML 分解为更小的块，然后逐步将这些块从服务器发送到客户端。

<img src="assets/03.png" style="width:70%">

这使得页面的各个部分能够更快地显示，而无需等待所有数据加载后才能呈现任何 UI

流式传输与 React 的组件模型配合得很好，因为每个组件都可以被视为一个块。优先级较高的组件（例如产品信息）或不依赖数据的组件可以先发送（例如布局），React 可以更早地开始水化。优先级较低的组件（例如评论、相关产品）可以在其数据被获取后在同一服务器请求中发送。

<img src="assets/04.png" style="width:70%">

`<Suspense>` 工作原理是包装一个执行异步操作（例如获取数据）的组件，在操作发生时显示后备 UI（例如骨架、微调器），然后在操作完成后交换组件。

见：[app/page.tsx](app/page.tsx) ，打开浏览器：http://localhost:3000/

我们可以看到，初始化所有组件均展示 loading，在 1、2、3s 后以此渲染 dom

```tsx
import { Suspense } from "react";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const PostFeed = async () => {
  await sleep(1000);
  return <div>PostFeed</div>;
};

const Weather = async () => {
  await sleep(2000);
  return <div>Weather</div>;
};

const User = async () => {
  await sleep(3000);
  return <div>User</div>;
};

export default function Home() {
  return (
    <div className="border-2 border-yellow-500 w-100 h-100">
      <Suspense fallback={<p>Loading feed...</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
        <Weather />
      </Suspense>
      <Suspense fallback={<p>Loading user...</p>}>
        <User />
      </Suspense>
    </div>
  );
}
```

通过使用 Suspense，您可以获得以下好处：

- 选择性水合 - React 根据用户交互确定首先使哪些组件具有交互的优先级。
- 流式服务器渲染 - 从服务器逐步将 HTML 渲染到客户端。

`Next.js` 将等待 `generateMetadata` 中的数据提取完成后再将 UI 流式传输到客户端。这可确保流式传输响应的第一部分包含 `<head>` 标签，所以不会对 `SEO` 造成影响

### 2、通过 loading 页面组件 实现
