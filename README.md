## 一、本节目标

本篇我们来实现右侧笔记编辑部分。

## 一、效果

当点击 `New` 按钮的时候进入编辑界面：

<img src="assets/02.png" style="width:70%">

当点击具体笔记的 `Edit` 按钮的时候进入该笔记的编辑页面：

<img src="assets/01.png" style="width:70%">

## 二、笔记预览

回忆下之前的路由设计，当点击 New 的时候，导航至 `/note/edit` 路由，当点击 Edit 的时候，导航至 `/note/edit/xxxx `路由。

新增 [app/note/edit/page.tsx](https://github.com/IsMShmily/nextjs_teaching/blob/notes_04/app/note/edit/page.tsx)

```ts
import NoteEditor from "../../components/NoteEditor";

export default async function EditPage() {
  return <NoteEditor noteId={""} initialTitle="Untitled" initialBody="" />;
}
```

新增 [app/note/edit/loading.tsx](https://github.com/IsMShmily/nextjs_teaching/blob/notes_04/app/note/edit/loading.tsx)

```ts
export default function EditSkeleton() {
  return (
    <div
      className="note-editor skeleton-container"
      role="progressbar"
      aria-busy="true"
    >
      <div className="note-editor-form">
        <div className="skeleton v-stack" style={{ height: "3rem" }} />
        <div className="skeleton v-stack" style={{ height: "100%" }} />
      </div>
      <div className="note-editor-preview">
        <div className="note-editor-menu">
          <div
            className="skeleton skeleton--button"
            style={{ width: "8em", height: "2.5em" }}
          />
          <div
            className="skeleton skeleton--button"
            style={{ width: "8em", height: "2.5em", marginInline: "12px 0" }}
          />
        </div>
        <div
          className="note-title skeleton"
          style={{ height: "3rem", width: "65%", marginInline: "12px 1em" }}
        />
        <div className="note-preview">
          <div className="skeleton v-stack" style={{ height: "1.5em" }} />
          <div className="skeleton v-stack" style={{ height: "1.5em" }} />
          <div className="skeleton v-stack" style={{ height: "1.5em" }} />
          <div className="skeleton v-stack" style={{ height: "1.5em" }} />
          <div className="skeleton v-stack" style={{ height: "1.5em" }} />
        </div>
      </div>
    </div>
  );
}
```

你可能会问，同级的 page.js 又没有数据请求，添加 loading.js 有什么用？

同级的 `page.js` 确实没有请求，但 `loading.js` 会将 `page.js` 和其 `children` 都包裹在 `<Suspense>` 中，所以 [app/note/edit/[id]/page.tsx](https://github.com/IsMShmily/nextjs_teaching/blob/notes_04/app/note/edit/%5Bid%5D/page.tsx) 中的请求也会触发该 `loading.js`。

[app/note/edit/[id]/page.tsx](https://github.com/IsMShmily/nextjs_teaching/blob/notes_04/app/note/edit/%5Bid%5D/page.tsx) 代码如下：

```ts
import NoteEditor from "../../../components/NoteEditor";
import { getNote } from "@/lib/redis";

export default async function EditPage({ params }: { params: { id: string } }) {
  const noteId = params.id;
  const note = await getNote(noteId);

  // 让效果更明显
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  await sleep(500);

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    );
  }

  return (
    <NoteEditor
      noteId={noteId}
      initialTitle={note.title}
      initialBody={note.content}
    />
  );
}
```

我们抽离了一个 `<NoteEditor>` 组件用于实现编辑功能，[app/components/NoteEditor.tsx](https://github.com/IsMShmily/nextjs_teaching/blob/notes_04/app/components/NoteEditor.tsx) 代码如下：

```ts
"use client";

import { useState } from "react";
import NotePreview from "@/components/NotePreview";
import { useFormStatus } from "react-dom";

export default function NoteEditor({ noteId, initialTitle, initialBody }) {
  const { pending } = useFormStatus();
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const isDraft = !noteId;

  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off">
        <label className="offscreen" htmlFor="note-title-input">
          Enter a title for your note
        </label>
        <input
          id="note-title-input"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label className="offscreen" htmlFor="note-body-input">
          Enter the body for your note
        </label>
        <textarea
          value={body}
          id="note-body-input"
          onChange={(e) => setBody(e.target.value)}
        />
      </form>
      <div className="note-editor-preview">
        <form className="note-editor-menu" role="menubar">
          <button
            className="note-editor-done"
            disabled={pending}
            type="submit"
            role="menuitem"
          >
            <img
              src="/checkmark.svg"
              width="14px"
              height="10px"
              alt=""
              role="presentation"
            />
            Done
          </button>
          {!isDraft && (
            <button
              className="note-editor-delete"
              disabled={pending}
              role="menuitem"
            >
              <img
                src="/cross.svg"
                width="10px"
                height="10px"
                alt=""
                role="presentation"
              />
              Delete
            </button>
          )}
        </form>
        <div className="label label--preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  );
}
```

因为需要控制输入框的状态，所以 `<NoteEditor>` 使用了客户端组件，我们在 `<NotePreview>` 中引用了 `<NotePreview>`组件，用于实现编辑时的实时预览功能。

## 三、笔记新增、更新、删除

当点击 `Done` 的时候，导航至对应的笔记预览页面 `/note/xxxx`。当点击 `Delete` 的时候，导航至首页。

正常开发笔记的增加、更新和删除功能，为了实现前后端交互，可能要写多个接口来实现，比如当点击删除的时候，调用删除接口，接口返回成功，前端跳转至首页。但既然我们都用了 `Next.js 15` 了，没必要这么麻烦，`Server Actions` 直接搞定，省的一个个写接口了。

修改 [app/components/NoteEditor.tsx](https://github.com/IsMShmily/nextjs_teaching/blob/notes_04/app/components/NoteEditor.tsx)

```ts
"use client";

import { useState } from "react";
import NotePreview from "./NotePreview";
import { useFormStatus } from "react-dom";
import { deleteNote, saveNote } from "../actions";
export default function NoteEditor({
  noteId,
  initialTitle,
  initialBody,
}: {
  noteId: string;
  initialTitle: string;
  initialBody: string;
}) {
  const { pending } = useFormStatus();
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const isDraft = !noteId;
  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off">
        <label className="offscreen" htmlFor="note-title-input">
          Enter a title for your note
        </label>
        <input
          id="note-title-input"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label className="offscreen" htmlFor="note-body-input">
          Enter the body for your note
        </label>
        <textarea
          value={body}
          id="note-body-input"
          onChange={(e) => setBody(e.target.value)}
        />
      </form>
      <div className="note-editor-preview">
        <form className="note-editor-menu" role="menubar">
          <button
            className="note-editor-done"
            disabled={pending}
            type="submit"
            formAction={() => saveNote(noteId, title, body)}
            role="menuitem"
          >
            Done
          </button>
          {!isDraft && (
            <button
              className="note-editor-delete"
              disabled={pending}
              formAction={() => deleteNote(noteId)}
              role="menuitem"
            >
              Delete
            </button>
          )}
        </form>
        <div className="label label--preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  );
}
```

新增：[app/actions.tsx](https://github.com/IsMShmily/nextjs_teaching/blob/notes_04/app/actions.tsx)

```ts
"use server";

import { redirect } from "next/navigation";
import { addNote, updateNote, delNote } from "@/lib/redis";

export async function saveNote(noteId: string, title: string, body: string) {
  const data = JSON.stringify({
    title,
    content: body,
    updateTime: new Date(),
  });

  if (noteId) {
    updateNote(noteId, data);
    redirect(`/note/${noteId}`);
  } else {
    const res = await addNote(data);
    redirect(`/note/${res}`);
  }
}

export async function deleteNote(noteId: string) {
  delNote(noteId);
  redirect("/");
}
```

至此 新增和删除可以正常运行了：

<img src="assets/01.gif" style="width:70%">
