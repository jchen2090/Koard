import Link from "next/link";
import ThemeToggler from "./ThemeToggler";
import { getUserSession } from "@/lib/supabase/actions";
import SyncStatus from "./SyncStatus";

export default async function Navbar() {
  const data = await getUserSession();

  return (
    <div className="flex justify-between items-center py-4 px-6 shadow-sm">
      <nav>
        <Link href="/" className="font-medium text-xl">
          Koard
        </Link>
      </nav>
      <div className="flex flex-row items-center gap-2">
        <SyncStatus />
        <ThemeToggler user={data.user} />
      </div>
    </div>
  );
}
