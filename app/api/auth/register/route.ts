// Deprecated: Use better-auth via the sign-up page (/auth/signup) instead.
// Custom-registered users used a different password hash (bcrypt) than better-auth (scrypt), so they could not sign in.
export async function POST() {
  return Response.json(
    {
      error: "This register endpoint is deprecated. Please create an account at /auth/signup.",
    },
    { status: 410 }
  );
}
