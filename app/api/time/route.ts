export async function GET() {
    console.log('GET /api/time')
    return Response.json({ data: new Date().toLocaleTimeString() })
  }
  