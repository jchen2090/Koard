"use server";

import createSupabaseServerClient from "@/lib/supabase/serverClient";

export async function signUpWithEmailAndPassword(data: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    throw new Error(`Error with signing up user: ${error}`);
  }
}

export async function signInWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    throw new Error(`Error with logging in user: ${error}`);
  }
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(`Error with logging out user: ${error}`);
  }
}

export async function getUserSession() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(`Error while getting user session: ${error}`);
  }

  return data;
}
