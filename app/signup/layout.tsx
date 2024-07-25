import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="flex justify-center mt-44">
      <Toaster position="top-right" />
      {children}
    </main>
  );
}
