"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signInWithEmailAndPassword } from "@/lib/supabase/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingButton } from "../ui/loadingButton";

const formSchema = z.object({
  email: z.string().min(1).email("Not a valid email"),
  password: z.string().min(6),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //TODO: Should route to home page post login
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const { authenticated } = await signInWithEmailAndPassword(values);

    if (authenticated) {
      router.push("/");
    } else {
      form.setError("root", { type: "server", message: "Email or password is incorrect" });
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? <LoadingButton /> : <Button className="mt-2">Log in</Button>}
        <div className="text-center text-destructive mt-2">{form.formState.errors.root?.message}</div>
      </form>
    </Form>
  );
}
