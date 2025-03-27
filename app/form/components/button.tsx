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
