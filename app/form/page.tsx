import { fetch_getTodos, fetch_createTodo } from "./action";
import Button from "./components/button";
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
        <Button />
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
