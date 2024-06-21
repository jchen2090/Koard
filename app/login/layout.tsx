import { ReactNode } from "react";

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return <main className="flex justify-center mt-44">{children}</main>;
}
