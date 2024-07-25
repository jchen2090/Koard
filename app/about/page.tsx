import { Button } from "@/components/ui/button";
import { RxGithubLogo } from "react-icons/rx";
import Link from "next/link";

export default function About() {
  return (
    <div className="flex justify-center items-center flex-col mt-36">
      <h1 className="text-4xl font-semibold">Koard</h1>
      <h2 className="text-lg italic mt-1">Build Your Custom Kaban Board</h2>
      <div className="flex items-end">
        <Button className="mt-4 mr-2" asChild>
          <Link href="/project">Get Started</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="https://github.com/jchen2090/Koard" target="_blank">
            <RxGithubLogo className="mr-2 h-4 w-4" />
            Link to Repo
          </Link>
        </Button>
      </div>
    </div>
  );
}
