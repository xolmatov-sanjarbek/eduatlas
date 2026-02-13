/**
 * Session user shape including Better Auth additionalFields (userType, universityId).
 * Use this when checking user type on dashboard pages.
 */
export type SessionUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  emailVerified?: boolean;
  userType?: "STUDENT" | "UNIVERSITY";
  universityId?: string | null;
  universityWebsite?: string | null;
};
