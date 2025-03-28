/**
 * React Server Components 示例
 * 默认情况下，Next.js 13+ 中的所有组件都是服务器组件
 */

// 1. 服务器组件 - 可以直接使用服务器端功能
async function ServerComponent() {
  // 可以直接使用 async/await
  const data = await fetch('https://api.vercel.app/blog').then(res => res.json());
  
  return (
    <div className="p-4 border-2 border-blue-500">
      <h2 className="text-xl font-bold">服务器组件</h2>
      <p>数据获取时间: {new Date().toISOString()}</p>
      <pre className="mt-2 p-2 bg-gray-100 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

// 2. 客户端组件 - 需要使用 'use client' 指令
'use client';
import { useState } from 'react';

function ClientComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-4 border-2 border-green-500">
      <h2 className="text-xl font-bold">客户端组件</h2>
      <p>计数: {count}</p>
      <button 
        onClick={() => setCount(c => c + 1)}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        增加
      </button>
    </div>
  );
}

// 3. 主页面组件 - 组合服务器组件和客户端组件
export default function RSCPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">React Server Components 示例</h1>
      
      {/* 服务器组件 */}
      <ServerComponent />
      
      {/* 客户端组件 */}
      <ClientComponent />
      
      {/* 直接在服务器组件中使用客户端组件 */}
      <div className="mt-4 p-4 border-2 border-purple-500">
        <h2 className="text-xl font-bold">混合使用示例</h2>
        <ClientComponent />
      </div>
    </div>
  );
} 