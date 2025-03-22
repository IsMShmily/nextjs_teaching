import { NextResponse, type NextRequest } from "next/server";

export const GET = async (
  _: NextRequest,
  { params }: { params: Promise<{ req: string }> }
) => {
  // request params { req: ['123', '456','789'] }
  console.log("params", await params);

  return NextResponse.json({
    message: "Hello, world!",
  });
};
