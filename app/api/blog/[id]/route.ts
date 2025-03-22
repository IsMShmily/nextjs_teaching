import { NextResponse, type NextRequest } from "next/server";

export const GET = async (
  _: NextRequest,
  { params }: { params: Promise<{ id: string | null }> }
) => {
  // request params { id: '123' }
  console.log("params", await params);

  return NextResponse.json({
    message: "Hello, world!",
  });
};
