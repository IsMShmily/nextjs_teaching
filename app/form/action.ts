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

export const fetch_createTodoBtn = async (formData: FormData) => {
  const newTodo = {
    id: todos.length + 1,
    title: formData.get("todo") as string,
  };

  todos.push(newTodo!);
  revalidatePath("/form");
  return newTodo;
};
