"use client";
import React, { useState } from "react";
import Link from "next/link";

const links = [
  {
    href: "/about",
    label: "jump about",
  },
  {
    href: "/about/blog",
    label: "jump blog",
  },
];

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);
  return (
    <div className="border-2 border-yellow-500 rounded-md p-2">
      <div className="m-5 flex gap-5">
        {links.map((link) => (
          <Link
            href={link.href}
            className="text-blue-500 hover:text-blue-800 transition-all duration-300"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <button
        className="bg-yellow-600 text-white rounded-md p-1 cursor-pointer"
        onClick={() => setCount(count + 1)}
      >
        About Layout btn -- {count}
      </button>
      {children}
    </div>
  );
};

export default AboutLayout;
