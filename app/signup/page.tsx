import SignUpForm from "@/components/auth/SignUpForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SignUp() {
  return (
    <Card className="flex flex-col w-96 shadow-md">
      <CardHeader className="text-center text-2xl font-semibold my-0">
        Sign Up
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  );
}
