"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { RxMoon, RxSun } from "react-icons/rx";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { signOut } from "@/lib/supabase/actions";

export default function ThemeToggler({ session }: { session: Session | null }) {
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

  // FIXME: There's a slight delay before this is loaded
  // Best approach is to display a skeleton of the same size while we wait for this to load
  return (
    isMounted && (
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          onClick={toggleTheme}
          className="dark:text-white hover:bg-inherit text-black bg-inherit"
        >
          {theme === "light" ? <RxMoon size={22} /> : <RxSun size={22} />}
        </Button>
        {session ? (
          <Button size="sm" onClick={handleSignOut}>
            Log out{" "}
          </Button>
        ) : null}
      </div>
    )
  );
}
