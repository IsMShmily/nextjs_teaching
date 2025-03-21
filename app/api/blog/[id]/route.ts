import { NextResponse } from "next/server";

export const GET = async ({ params }: { params: { id: string } }) => {
  // request params { id: '123' }
  console.log("params", await params);

  return NextResponse.json({
    message: "Hello, world!",
  });
};
