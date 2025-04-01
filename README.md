## 一、本节目标

实现笔记预览功能和了解在 Nextjs15 中路由缓存配置

<img src="assets/01.gif" style="width:70%">

## 二、实现笔记预览功能

```md
# 安装依赖

pnpm i marked sanitize-html
```

- marked 用于把 markdown 转换为 HTML 的库，
- sanitize-html 用于清理 HTML，比如删除一些不良的写法，转义特殊字符等

<br />

按照我们之前的设计，当点击左侧笔记列表的时候，会导航至对应的 `/note/xxxx` 路由，所以我们再新建一个 [app/note/[id]/page.tsx](app/note/[id]/page.tsx) 文件，代码如下：

```ts
import Note from "@/components/Note";
import { getNote } from "@/lib/redis";

export default async function Page({ params }) {
  // 动态路由 获取笔记 id
  const noteId = params.id;
  const note = await getNote(noteId);

  // 为了让 Suspense 的效果更明显
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  await sleep(5000);

  if (note == null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    );
  }

  return <Note noteId={noteId} note={note} />;
}
```

用到数据请求的地方，考虑一下是否需要用 `Suspense` 和 `loading.js`。这里就是一个很适合用 `loading.js` 的地方，我们再添加一个 [app/note/[id]/loading.tsx](app/note/[id]/loading.tsx) 文件，代码如下：

```ts
export default function NoteSkeleton() {
  return (
    <div
      className="note skeleton-container"
      role="progressbar"
      aria-busy="true"
    >
      <div className="note-header">
        <div
          className="note-title skeleton"
          style={{ height: "3rem", width: "65%", marginInline: "12px 1em" }}
        />
        <div
          className="skeleton skeleton--button"
          style={{ width: "8em", height: "2.5em" }}
        />
      </div>
      <div className="note-preview">
        <div className="skeleton v-stack" style={{ height: "1.5em" }} />
        <div className="skeleton v-stack" style={{ height: "1.5em" }} />
        <div className="skeleton v-stack" style={{ height: "1.5em" }} />
        <div className="skeleton v-stack" style={{ height: "1.5em" }} />
        <div className="skeleton v-stack" style={{ height: "1.5em" }} />
      </div>
    </div>
  );
}
```

我们在 `page.js` 中引入了 `<Note>` 组件，[app/components/Note.tsx](app/components/Note.tsx) 的代码如下：

```ts
import dayjs from "dayjs";
import NotePreview from "@/components/NotePreview";
import EditButton from "@/components/EditButton";
export default function Note({ noteId, note }) {
  const { title, content, updateTime } = note;

  return (
    <div className="note">
      <div className="note-header">
        <h1 className="note-title">{title}</h1>
        <div className="note-menu" role="menubar">
          <small className="note-updated-at" role="status">
            Last updated on {dayjs(updateTime).format("YYYY-MM-DD hh:mm:ss")}
          </small>
          <EditButton noteId={noteId}>Edit</EditButton>
        </div>
      </div>
      <NotePreview>{content}</NotePreview>
    </div>
  );
}
```

这里我们把预览的部分又单独抽离成了一个 `<NotePreview>` 组件，之所以抽离，是考虑到在编辑界面复用。[app/components/NotePreview.tsx](app/components/NotePreview.tsx) 的代码如下：

```ts
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
  "img",
  "h1",
  "h2",
  "h3",
]);
const allowedAttributes = Object.assign(
  {},
  sanitizeHtml.defaults.allowedAttributes,
  {
    img: ["alt", "src"],
  }
);

export default function NotePreview({ children }) {
  return (
    <div className="note-preview">
      <div
        className="text-with-markdown"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(marked(children || ""), {
            allowedTags,
            allowedAttributes,
          }),
        }}
      />
    </div>
  );
}
```

这时候我们 `pnpm run dev` ，打开 http://localhost:3000/ 效果如下：

<img src="assets/01.gif" style="width:70%">

## 三、原理解析

当我们选择 ea molestias 这条笔记的时候，网络请求中的数据在一开始为：

<img src="assets/01.png" style="width:70%">

截止行数为 47 行，

这个数据被称为 `React Server Components Payload`，简称 `RSC Payload`，其实你看这个地址的参数 `?rsc=xxxx `其实就暗示了它跟 `RSC` 相关。查看返回的数据 ，你会发现这个数据很奇怪，既不是我们常见的 `HTML`、`XML`，也不是什么其他格式，这就是 `React` 定义的一种特殊的格式。

我们在查看详情的时候有 `5s` 的 `sleep` 操作，前 `47` 行实际上在渲染骨架图和请求 `js` 文件，`5s` 后数据响应,我们再次查看本次网络请求：

<img src="assets/06.png" style="width:70%">

可以看到，内容的 标题 `ea molestias` 在 `49` 行返回,这也应证了 `RSC Payload` 服务端是逐行返回，客户端是逐行解析、渐进式渲染的。

<img src="assets/03.png" style="width:70%">

那客户端获取到 `RSC Payload` 后还干了什么呢？其实就是根据 `RSC Payload` 重新渲染组件树，修改 DOM。但使用 `RSC Payload` 的好处在于组件树中的状态依然会被保持，比如左侧笔记列表的展开和收回就是一种客户端状态，当你新增笔记、删除笔记时，虽然组件树被重新渲染，但是客户端的状态依然会继续保持了。

这也被认为是 `SSR` 和 `RSC` 的最大区别，其实现的关键就在于服务端组件没有被渲染成 HTML，而是一种特殊的格式（`RSC Payload`）。

传统的 `SSR` 和 `RSC` 的区别：

- RSC 的代码不会发送到客户端，但传统 SSR 所有组件的代码都会被发送到客户端
- RSC 可以在组件树中任意位置获取后端，传统 SSR 只能在顶层（getServerSideProps）访问后端
- 服务器组件可以重新获取，而不会丢失其树内的客户端状态

## 四、页面缓存

在 `Nextjs15`中配置缓存需要在 [next.config.ts](next.config.ts)中配置，
增加代码如下：

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  /**
   * experimental 配置项用于启用实验性功能
   * 这些功能可能在未来版本中成为稳定特性
   */
  experimental: {
    /**
     * staleTimes 配置用于控制数据缓存时间
     * 可以优化应用性能和用户体验
     */
    staleTimes: {
      /**
       * dynamic: 动态路由页面的缓存时间（秒）
       * 这里设置为 10 秒，意味着：
       * - 动态页面数据最多缓存 10 秒
       * - 10 秒后的请求会触发重新获取数据
       * - 适合数据更新较频繁的场景
       */
      dynamic: 10,

      /**
       * static: 静态页面的缓存时间（秒）
       * 这里设置为 180 秒（3分钟），意味着：
       * - 静态页面最多缓存 3 分钟
       * - 3 分钟后的请求会触发重新生成
       * - 适合内容相对稳定的页面
       */
      static: 180,
    },
  },
};

export default nextConfig;
```

<img src="assets/02.gif" style="width:70%">

这就是 `Next.js` 提供的客户端路由缓存功能，客户端会缓存 RSC Payload 数据，所以当点击笔记后很快再次点击，这时就会从缓存中获取数据

这个例子中因为我们用的是动态路由，是动态渲染，缓存持续 `10s`，所以首次点击笔记获取 `RSC Payload` 数据 `10s` 后再点击就会重新获取 `RSC Payload`。
