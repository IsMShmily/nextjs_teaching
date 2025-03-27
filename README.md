## nextjs 官方文档（current branch 对应如下文档）

[server-actions-and-mutations](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

---

## 一、什么是 Server Actions

`Server Actions` 是指在服务端执行的异步函数，它们可以在服务端和客户端组件中使用，以处理 Next.js 应用中的数据提交和更改

我们可以使用 "`use server`" 来定义服务器操作指令。您可以将指令放在 `async` 函数的顶部，以将该函数标记为服务器操作，或者放在单独文件的顶部，以将该文件的所有导出标记为服务器操作。

- 将 "`use server`" 放到一个 `async` 函数的顶部表示该函数为 `Server Action`（函数级别）
- 将 "`use server`" 放到一个单独文件的顶部表示该文件导出的所有函数都是 `Server Actions`（模块级别）

当在服务端组件中使用的时候，两种级别都可以使用：

```ts
export default function Page() {
  // Server Action
  async function create() {
    "use server";
    // Mutate data
  }

  return "...";
}
```

要在客户端组件中调用服务器操作，请创建一个新文件并在其顶部添加 "`use server`" 指令。文件内的所有导出函数都将被标记为可在客户端和服务器组件中重复使用的服务器操作：

见： [app/action.ts](app/action.ts)

```ts
"use server";

export async function create() {}
```

见： [app/button.tsx](app/button.tsx)

```ts
"use client";

import { create } from "./actions";

export function Button() {
  return <button onClick={() => create()}>Create</button>;
}
```

您还可以将服务器操作作为 `prop` 传递给客户端组件：

```ts
<ClientComponent updateItemAction={updateItem} />
```

```ts
"use client";

export default function ClientComponent({
  updateItemAction,
}: {
  updateItemAction: (formData: FormData) => void;
}) {
  return <form action={updateItemAction}>{/* ... */}</form>;
}
```

## 二、如何使用

在 `Pages Router` 下，如果要进行前后端交互，需要先定义一个接口，然后前端调用接口完整前后端交互。而在 `App Router` 下，这种操作都可以简化为 `Server Actions`。

而在具体使用上，虽然 `Server Actions` 常与 `<form>` 一起使用，但其实还可以在事件处理程序、`useEffect`、三方库、其他表单元素（如 `<button>`）中调用。

我们写一个 `TODO` 看下 `Server Actions` 是如何实现的？

<img src="assets/01.png" style="width:70%">

[app/form/page.tsx](app/form/page.tsx)

```ts
import { fetch_getTodos, fetch_createTodo } from "./action";

const FormPage = async () => {
  const todos = await fetch_getTodos();

  return (
    <>
      <form action={fetch_createTodo}>
        <input
          type="text"
          name="todo"
          className="border-2 border-gray-300 rounded-md p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Submit
        </button>
      </form>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
};

export default FormPage;
```

[app/form/action.ts](app/form/action.ts)

```ts
"use server";

import { revalidatePath } from "next/cache";

const todos = [
  { id: 1, title: "Todo 1" },
  { id: 2, title: "Todo 2" },
  { id: 3, title: "Todo 3" },
];

export const fetch_getTodos = async () => {
  return todos;
};

export const fetch_createTodo = async (formData: FormData) => {
  const newTodo = {
    id: todos.length + 1,
    title: formData.get("todo") as string,
  };

  todos.push(newTodo!);
  revalidatePath("/form");
  return newTodo;
};
```

`Next.js` 会自动插入一个` <input type="hidden">`，其值为 `$ACTION_ID_xxxxxxxx`，用于让服务端区分 `Action`（因为一个页面可能使用多个 `Server Actions`）。

<img src="assets/02.png" style="width:70%">

当点击 `Submit` 的时候，触发表单提交，会发送一个 `POST` 请求到当前页面地址：

<img src="assets/03.png" style="width:70%">

请求会携带表单中的值，以及` $ACTION_ID`：

<img src="assets/04.png" style="width:70%">

接口返回 `RSC Payload`，用于渲染更新后的数据：

<img src="assets/05.png" style="width:70%">

总结：

- Server Actions 背后使用的是 POST 请求方法，请求当前页面地址，根据 $ACTION_ID 区分
- Server Actions 与 Next.js 的缓存和重新验证架构集成。调用 Action 时，Next.js 可以一次性返回更新的 UI 和新数据

<br />

通过 事件 使用 `Server Actions`，新增：[app/form/components/button.tsx](app/form/components/button.tsx)

```ts
"use client";

import { fetch_createTodoBtn } from "../action";
const Button = () => {
  const insetTodoHandler = async () => {
    const formData = new FormData();
    formData.append("todo", "666");
    await fetch_createTodoBtn(formData);
  };
  return (
    <div>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={insetTodoHandler}
      >
        Create
      </button>
    </div>
  );
};

export default Button;
```

修改：[app/form/action.ts](app/form/action.ts)

```ts
// ...
// ...

// 增加 fetch_createTodoBtn 方法
export const fetch_createTodoBtn = async (formData: FormData) => {
  const newTodo = {
    id: todos.length + 1,
    title: formData.get("todo") as string,
  };

  todos.push(newTodo!);
  revalidatePath("/form");
  return newTodo;
};
```
