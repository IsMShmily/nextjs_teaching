import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  return NextResponse.json(data);
};

export const POST = async (request: Request) => {
  const article = await request.json();
  return NextResponse.json(
    {
      id: Math.random().toString(36).slice(-8),
      data: article,
    },
    { status: 201 }
  );
};

export const HEAD = async (request: Request) => {};

export const PUT = async (request: Request) => {};

export const PATCH = async (request: Request) => {};

export const DELETE = async (request: Request) => {};

// 如果 `OPTIONS` 没有定义, Next.js 会自动实现 `OPTIONS`
export const OPTIONS = async (request: Request) => {};
