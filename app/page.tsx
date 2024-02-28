import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col mt-36">
      <h1 className="text-4xl font-semibold">Koard</h1>
      <h2 className="text-lg italic mt-1">Build Your Custom Kaban Board</h2>
      <Button className="mt-4">
        <Link href="/signup">Get Started</Link>
      </Button>
    </div>
  );
}
