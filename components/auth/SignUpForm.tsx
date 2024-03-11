"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signUpWithEmailAndPassword } from "../../lib/supabase/actions";

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
    { message: "Passwords do not match", path: ["confirmPassword"] },
  );

export default function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  //TODO: Currently 2FA is disabled, will enable someday
  //TODO: User should be logged in and routed to home page after successful creation
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signUpWithEmailAndPassword(values);
    } catch (e) {
      alert(`Error with server, try again later`);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
      >
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
        <Button className="mt-2">Sign up</Button>
      </form>
    </Form>
  );
}
