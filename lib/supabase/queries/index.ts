"use server";

import { DataSchema } from "@/app/project/page";
import createSupabaseServerClient from "../serverClient";
import { ChangeType } from "@/components/providers/types";
import { handleAddedChanges } from "./insertQueries";
import { handleDeletedChanges } from "./deleteQueries";
import { handleUpdatedChanges } from "./updateQueries";

export async function getData() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("columns")
    .select(`column_name, column_id, color, cards (card_name, card_id)`)
    .order("index", { ascending: true })
    .order("index", { referencedTable: "cards", ascending: true })
    .returns<DataSchema[]>();

  if (error) {
    console.error(`Error when getting data ${JSON.stringify(error, null, 2)}`);
    return [];
  }
  return data;
}

export async function createUserEntry() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("users").insert({});

  if (error) {
    console.log(`Error with creating new user: ${JSON.stringify(error, null, 2)}`);
  }
}

export async function syncData(changes: ChangeType) {
  if (process.env.NODE_ENV === "development") {
    console.log(JSON.stringify(changes, null, 2));
    return;
  }

  changes.added.forEach((change) => handleAddedChanges(change));
  changes.updated.forEach((change) => handleUpdatedChanges(change));
  changes.deleted.forEach((change) => handleDeletedChanges(change));
}
