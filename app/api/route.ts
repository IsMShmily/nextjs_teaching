export async function GET() {
  console.log("get", process.env.DB_USER);
  return new Response("Hello, World!");
}
