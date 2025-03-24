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
// export const middleware = (request: NextRequest) => {
//   // cookie { name: 'vercel', value: '31321' }
//   console.log(request.cookies.get("vercel"));

//   /**
//    * cookies [
//    * { name: 'vercel', value: '31321' },
//    * { name: 'nextjs', value: '333' }
//    * ]
//    */
//   console.log(request.cookies.getAll());

//   // true
//   console.log("1、is has vercel ：", request.cookies.has("vercel"));

//   request.cookies.delete("vercel");

//   // false
//   console.log("2、is has vercel ：", request.cookies.has("vercel"));

//   /** 设置 cookie */
//   const response = NextResponse.next();
//   response.cookies.set("vercel", "333");
//   response.cookies.set({
//     name: "vercel",
//     value: "333",
//     path: "/",
//   });
//   console.log("3、vercel：", response.cookies.get("vercel"));

//   return response;
// };

/** 三、在中间件中使用 Headers */
// export const middleware = (request: NextRequest) => {
//   const headers = new Headers(request.headers);

//   headers.set("token", "this is my token");

//   // 通过 NextResponse.next() 的配置对象来修改请求
//   const response = NextResponse.next({
//     request: {
//       headers: headers, // 修改请求头
//     },
//   });

//   // 通过 response 的 headers 来修改响应头
//   response.headers.set("token", "this is my token");
//   return response;
// };

/** 四、在中间件中使用 CORS */
// // 定义允许跨域访问的源站列表
// const allowedOrigins = ["https://example.com", "https://sub.example.com"];

// // 定义 CORS 相关的配置选项
// const corsOptions = {
//   // 允许的 HTTP 请求方法
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//   // 允许的请求头
//   "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };

// export const middleware = (request: NextRequest) => {
//   // 获取请求的源站地址，如果没有则设为空字符串
//   const origin = request.headers.get("origin") ?? "";
//   // 检查请求的源站是否在允许列表中
//   const isAllowedOrigin = allowedOrigins.includes(origin);
//   // 判断是否为预检请求（OPTIONS 请求）
//   const isOptions = request.method === "OPTIONS";

//   // 处理预检请求
//   if (isOptions) {
//     // 构建预检响应的头部信息
//     const preflightHeaders = {
//       // 如果是允许的源站，则添加 Access-Control-Allow-Origin 头
//       ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
//       // 展开其他 CORS 配置选项
//       ...corsOptions,
//     };

//     // 返回预检响应，状态码默认为 200
//     return NextResponse.json({}, { headers: preflightHeaders });
//   }

//   // 处理非预检请求
//   const response = NextResponse.next();
//   // 为所有响应添加 CORS 头部信息
//   Object.entries(corsOptions).forEach(([key, value]) => {
//     response.headers.set(key, value);
//   });

//   return response;
// };

// // 配置中间件只对 API 路由生效
// export const config = {
//   matcher: "/api/:path*",
// };

/** 五、如何直接响应 */
// export const config = {
//   matcher: "/api/:function*",
// };

// export const middleware = (request: NextRequest) => {
//   // 鉴权判断
//   if (!isAuthenticated(request)) {
//     // 返回错误信息
//     return new NextResponse(
//       JSON.stringify({ success: false, message: "authentication failed" }),
//       { status: 401, headers: { "content-type": "application/json" } }
//     );
//   }
// };
