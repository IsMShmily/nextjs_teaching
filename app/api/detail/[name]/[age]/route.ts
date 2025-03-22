import { NextResponse, type NextRequest } from "next/server";

export const GET = async (
  _: NextRequest,
  {
    params,
  }: {
    params: Promise<{ name: string; age: string }>;
  }
) => {
  // request params { name: 'shmily', age: '20' }
  console.log("params", await params);

  return NextResponse.json({
    message: "Hello, world!",
  });
};
