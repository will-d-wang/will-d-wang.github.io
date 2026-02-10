import type { ReactNode } from "react";

export const metadata = {
  title: "Documentation - Will D. Wang",
  description: "Technical documentation and guides",
};

export default async function DocsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
