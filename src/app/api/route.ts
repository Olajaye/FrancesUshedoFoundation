export async function GET() {
  return Response.json({
    success: true,
    message: "Welcome to our API 🎉",
    description: "This is the introductory endpoint.",
    version: "1.0.0",
  });
}
