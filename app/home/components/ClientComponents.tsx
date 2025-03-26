"use client";

import { useState } from "react";
const ClientComponent = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="border border-red-500">
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

export default ClientComponent;
