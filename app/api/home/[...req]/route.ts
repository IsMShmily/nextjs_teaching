import { NextResponse } from "next/server";

export const GET = async ({ params }: { params: { req: string } }) => {
  // request params { req: ['123', '456','789'] }
  console.log("params", await params);

  return NextResponse.json({
    message: "Hello, world!",
  });
};
