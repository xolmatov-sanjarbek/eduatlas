// Deprecated: Use better-auth via the sign-in page (/auth/signin) instead.
// This route never created a session and did not verify passwords.
export async function POST() {
  return Response.json(
    {
      error: "This login endpoint is deprecated. Please sign in at /auth/signin.",
    },
    { status: 410 }
  );
}
