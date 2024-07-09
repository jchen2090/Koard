import { ContextProvider } from "@/components/providers/contextProvider";
import { ReactNode } from "react";

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return <ContextProvider>{children}</ContextProvider>;
}
