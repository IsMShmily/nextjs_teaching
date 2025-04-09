## 一、本节目标

当在搜索框输入搜索文字的时候，URL 上添加对应的搜索参数，同时展示搜索后的笔记列表。当页面刷新的时候，如果有搜索参数，也会展示对应搜索后的笔记列表。效果如下：

## 一、效果

<img src="assets/01.gif" style="width:70%">

## 二、搜索实现

[app/components/Sidebar.tsx](app/components/Sidebar.tsx) 导入搜索栏组件：

```ts
import React, { Suspense } from "react";
import Link from "next/link";
import SidebarNoteList from "../components/SidebarNoteList";
import EditButton from "./EditButton";
import NoteListSkeleton from "./NoteListSkeleton";
// 新增
import SidebarSearchField from "./SidebarSearchField";

export default async function Sidebar() {
  return (
    <>
      <section className="col sidebar">
        <Link href={"/"} className="link--unstyled">
          <section className="sidebar-header">
            <img
              className="logo"
              src="/favicon.ico"
              width="22px"
              height="20px"
              alt=""
              role="presentation"
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          // 新增
          <SidebarSearchField />
          <EditButton noteId={""}>New</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  );
}
```

新增 [app/components/SidebarSearchField.tsx](app/components/SidebarSearchField.tsx) 代码如下：

```ts
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

function Spinner({ active = true }) {
  return (
    <div
      className={["spinner", active && "spinner--active"].join(" ")}
      role="progressbar"
      aria-busy={active ? "true" : "false"}
    />
  );
}

export default function SidebarSearchField() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term: string) {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="search" role="search">
      <label className="offscreen" htmlFor="sidebar-search-input">
        Search for a note by title
      </label>
      <input
        id="sidebar-search-input"
        placeholder="Search"
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Spinner active={isPending} />
    </div>
  );
}
```

新增 [app/components/SidebarNoteListFilter.tsx](app/components/SidebarNoteListFilter.tsx) 代码如下

```ts
"use client";

import { useSearchParams } from "next/navigation";
import SidebarNoteItemContent from "./SidebarNoteItemContent";

export default function SidebarNoteList({ notes }: { notes: any }) {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("q");
  return (
    <ul className="notes-list">
      {notes.map((noteItem: any) => {
        const { noteId, note, header } = noteItem;
        if (
          !searchText ||
          (searchText &&
            note.title.toLowerCase().includes(searchText.toLowerCase()))
        ) {
          return (
            <SidebarNoteItemContent
              key={noteId}
              id={noteId}
              title={note.title}
              expandedChildren={
                <p className="sidebar-note-excerpt">
                  {note.content.substring(0, 20) || <i>(No content)</i>}
                </p>
              }
            >
              {header}
            </SidebarNoteItemContent>
          );
        }

        return null;
      })}
    </ul>
  );
}
```

修改 [app/components/SidebarNoteList.tsx](app/components/SidebarNoteList.tsx) 代码如下

```ts
import SidebarNoteListFilter from "./SidebarNoteListFilter";
import { getAllNotes } from "@/lib/redis";
import { sleep } from "@/lib/utils";
import SidebarNoteItemHeader from "./SidebarNoteItemHeader";

export default async function NoteList() {
  await sleep(500);
  const notes = await getAllNotes();

  if (Object.entries(notes).length == 0) {
    return <div className="notes-empty">{"No notes created yet!"}</div>;
  }

  return (
    <SidebarNoteListFilter
      notes={Object.entries(notes).map(([noteId, note]) => {
        const noteData = JSON.parse(note);
        return {
          noteId,
          note: noteData,
          header: (
            <SidebarNoteItemHeader
              title={noteData.title}
              updateTime={noteData.updateTime}
            />
          ),
        };
      })}
    />
  );
}
```

此时功能运行正常且客户端也不会打包 dayjs：

<img src="assets/02.png" style="width:70%">
