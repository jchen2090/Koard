"use client";

import { guestSignIn } from "@/lib/supabase/actions";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function GustSignInButton() {
  const router = useRouter();

  const handleAnonSignIn = async () => {
    const { authenticated } = await guestSignIn();

    if (authenticated) {
      router.push("/project");
    } else {
      toast.error("Error with server", {
        style: {
          background: "hsl(var(--destructive))",
          color: "hsl(var(--destructive-foreground))",
        },
      });
    }
  };
  return (
    <Button variant="link" className="hover:underline italic text-sm font-normal" onClick={handleAnonSignIn}>
      Or continue as guest
    </Button>
  );
}
