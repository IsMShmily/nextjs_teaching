import { NextRequest, NextResponse } from "next/server";

/** 一、基本使用 */
/** 1、使用 matcher */

// export const middleware = (request: NextRequest) => {
//   // 请求路由为 /about/** 重定向到 /home
//   return NextResponse.redirect(new URL("/home", request.url));
// };

// /** 配置匹配路径 */
// export const config = {
//   matcher: "/about/:path*",
// };

/** 2、条件判断 */

// export const middleware = (request: NextRequest) => {
//   // 将 url 开头为 /about 的请求重定向到 /home
//   if (request.nextUrl.pathname.startsWith("/about")) {
//     return NextResponse.redirect(new URL("/home", request.url));
//   }
// };

/** 二、中间件中使用 cookies */
export const middleware = (request: NextRequest) => {
  // cookie { name: 'vercel', value: '31321' }
  console.log(request.cookies.get("vercel"));

  /**
   * cookies [
   * { name: 'vercel', value: '31321' },
   * { name: 'nextjs', value: '333' }
   * ]
   */
  console.log(request.cookies.getAll());

  // true
  console.log("1、is has vercel ：", request.cookies.has("vercel"));

  request.cookies.delete("vercel");

  // false
  console.log("2、is has vercel ：", request.cookies.has("vercel"));



  /** 设置 cookie */
  
};
