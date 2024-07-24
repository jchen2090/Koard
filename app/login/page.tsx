import GuestSignInButton from "@/components/auth/GuestSignInButton";
import LoginForm from "@/components/auth/LoginForm";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function Login() {
  return (
    <Card className="flex flex-col w-96 shadow-md">
      <CardHeader className="text-center text-2xl font-semibold my-2">Authenticate</CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex flex-col justify-center">
        <Link href="/signup" className="hover:underline italic text-sm">
          Don&apos;t have an account? Sign up
        </Link>
        <GuestSignInButton />
      </CardFooter>
    </Card>
  );
}
