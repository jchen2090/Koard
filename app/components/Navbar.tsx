import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="py-4 px-6 shadow-sm">
      <Link href="/" className="font-medium text-xl">
        Koard
      </Link>
    </nav>
  );
}
