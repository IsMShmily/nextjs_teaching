"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="border-2 border-yellow-500 w-100 h-100">
      
      {/* useRouter Hook 路由跳转 */}
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/blog/a")}
          className="text-blue-500 hover:text-blue-600"
        >
          BlogA
        </button>
        <button
          onClick={() => router.push("/blog/b")}
          className="text-blue-500 hover:text-blue-600"
        >
          BlogB
        </button>
      </div>
      hello next.js Home Page
    </div>
  );
}
