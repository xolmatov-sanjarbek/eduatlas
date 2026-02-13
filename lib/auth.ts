import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Resend } from "resend";
import { VerificationEmail } from "@/components/emails/verification-email";
import { render } from "@react-email/components";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      userType: {
        type: "string",
        required: false,
        defaultValue: "STUDENT",
        input: true, // allow setting during signup
      },
      universityId: {
        type: "string",
        required: false,
        input: false,
      },
      universityWebsite: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      // Log verification URL to console for testing
      console.log(`\n📧 VERIFICATION EMAIL [${user.email}]:\n🔗 URL: ${url}\n`);

      const html = await render(VerificationEmail({ url }));
      await resend.emails.send({
        from: "EduAtlas <onboarding@resend.dev>",
        to: user.email,
        subject: "Verify your email address",
        html: html,
      });
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  appName: "EduAtlas",
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  trustedOrigins: process.env.NEXT_PUBLIC_APP_URL
    ? [process.env.NEXT_PUBLIC_APP_URL]
    : [],
});