"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { RxMoon, RxSun } from "react-icons/rx";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { signOut } from "@/lib/supabase/actions";
import { Skeleton } from "./ui/skeleton";

export default function ThemeToggler({ user }: { user: User | null }) {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (e) {
      alert("Error with server, try again later");
    }
  };

  if (isMounted) {
    return (
      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost" onClick={toggleTheme}>
          {theme === "light" ? <RxMoon size={22} /> : <RxSun size={22} />}
        </Button>
        {user && (
          <Button size="sm" onClick={handleSignOut}>
            Log out
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-10 w-10 rounded-md" />
      {user && <Skeleton className="h-10 rounded-md w-16" />}
    </div>
  );
}
