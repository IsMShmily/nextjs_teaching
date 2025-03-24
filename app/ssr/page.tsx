// const SSR = async () => {
//   const getData = async () => {
//     "use server";
//     const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const data = await res.json();
//     return data;
//   };

//   const data = await getData();
//   return <div>{data ? JSON.stringify(data) : "loading..."}</div>;
// };

// export default SSR;

/** SSG 调试 */
"use client";
import { useEffect, useState } from "react";

const SSR = () => {
  const [data, setData] = useState<unknown>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return <div>{data ? JSON.stringify(data) : "loading..."}</div>;
};

export default SSR;
