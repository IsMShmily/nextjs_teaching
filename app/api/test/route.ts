import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  // request /api/test
  console.log("request", request.nextUrl.pathname);

  // request URLSearchParams { 'name' => 'myName' }
  console.log("searchParams", request.nextUrl.searchParams);

  return NextResponse.json({
    message: "Hello, world!",
  });
};
