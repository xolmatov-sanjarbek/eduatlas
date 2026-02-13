"use client";

import { usePathname } from "next/navigation";
import Header1 from "@/components/navbar";
import FooterStandard from "@/components/footer";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome =
    pathname.startsWith("/auth") || pathname.startsWith("/verify-request");

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Header1 />
      {children}
      <FooterStandard />
    </>
  );
}
