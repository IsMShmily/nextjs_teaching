import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  // 请求路由为 /about/** 重定向到 /home
  return NextResponse.redirect(new URL("/home", request.url));
};

/** 配置匹配路径 */
export const config = {
  matcher: "/about/:path*",
};
