"use server";

import createSupabaseServerClient from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";

export async function signUpWithEmailAndPassword(data: { email: string; password: string; confirmPassword: string }) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    throw new Error(`Error with signing up user: ${error}`);
  }
}

export async function signInWithEmailAndPassword(data: { email: string; password: string }) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { authenticated: false };
  }
  return { authenticated: true };
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(`Error with logging out user: ${error}`);
  }
  redirect("/about");
}

export async function getUserSession() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  return data;
}
