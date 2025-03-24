"use client";

import { useEffect, useState } from "react";

const CSR = () => {
  const [data, setData] = useState<unknown>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return <div>{data ? JSON.stringify(data) : "loading..."}</div>;
};

export default CSR;
