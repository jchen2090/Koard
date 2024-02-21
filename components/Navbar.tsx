import Link from "next/link";
import ThemeToggler from "./ThemeToggler";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center py-4 px-6 shadow-sm">
      <nav>
        <Link href="/" className="font-medium text-xl">
          Koard
        </Link>
      </nav>
      <ThemeToggler />
    </div>
  );
}
