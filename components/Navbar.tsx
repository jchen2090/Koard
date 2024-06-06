import Link from "next/link";
import ThemeToggler from "./ThemeToggler";
import { getUserSession } from "@/lib/supabase/actions";
import { Session } from "@supabase/supabase-js";

export default async function Navbar() {
  let data: { session: Session | null } = { session: null };
  try {
    data = await getUserSession();
  } catch (e) {
    console.log("Error with getting user session");
  }

  return (
    <div className="flex justify-between items-center py-4 px-6 shadow-sm">
      <nav>
        <Link href="/" className="font-medium text-xl">
          Koard
        </Link>
      </nav>
      <ThemeToggler session={data.session} />
    </div>
  );
}
