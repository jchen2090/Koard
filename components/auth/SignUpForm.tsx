"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signUpWithEmailAndPassword } from "../../lib/supabase/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingButton } from "../ui/loadingButton";
import toast from "react-hot-toast";
import { createUserEntry } from "@/lib/supabase/queries";

const formSchema = z
  .object({
    email: z.string().min(1).email("Not a valid email"),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine(
    (data) => {
      return data.confirmPassword === data.password;
    },
    { message: "Passwords do not match", path: ["confirmPassword"] }
  );

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await signUpWithEmailAndPassword(values);
      router.push("/project");
    } catch (e) {
      toast.error("Error with server", {
        style: {
          background: "hsl(var(--destructive))",
          color: "hsl(var(--destructive-foreground))",
        },
      });
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? <LoadingButton /> : <Button className="mt-2">Sign Up</Button>}
      </form>
    </Form>
  );
}
