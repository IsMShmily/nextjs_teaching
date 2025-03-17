"use client";
import { useState } from "react";

const AboutTemplate = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);
  return (
    <div className="m-5 border-2 border-red-500 rounded-md p-5 ">
      <button
        className="bg-red-600 text-white rounded-md p-1 cursor-pointer"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        About Template btn -- {count}
      </button>
      <div>{children}</div>
    </div>
  );
};

export default AboutTemplate;
