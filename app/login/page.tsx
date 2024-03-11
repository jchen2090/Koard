import LoginForm from "@/components/auth/LoginForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getUserSession } from "@/lib/supabase/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
  const { session } = await getUserSession();

  //TODO: Redirect this to home page in the future
  if (session) {
    redirect("/");
  }

  return (
    <Card className="flex flex-col w-96 shadow-md">
      <CardHeader className="text-center text-2xl font-semibold my-2">
        Authenticate
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="justify-center">
        <Link href="/signup" className="hover:underline italic text-sm">
          Don&apos;t have an account? Sign up
        </Link>
      </CardFooter>
    </Card>
  );
}
