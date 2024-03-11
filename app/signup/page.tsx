import SignUpForm from "@/components/auth/SignUpForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getUserSession } from "@/lib/supabase/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const { session } = await getUserSession();

  //TODO: Redirect this to home page in the future
  if (session) {
    redirect("/");
  }

  return (
    <Card className="flex flex-col w-96 shadow-md">
      <CardHeader className="text-center text-2xl font-semibold my-2">
        Sign Up
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter className="justify-center">
        <Link href="/login" className="hover:underline italic text-sm">
          Already have an account? Log in
        </Link>
      </CardFooter>
    </Card>
  );
}
