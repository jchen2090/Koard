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
    .returns<DataSchema[]>();

  if (error) {
    console.error(`Error when getting data ${error}`);
    return [];
  }
  return data;
}

export async function syncData(changes: ChangeType) {
  changes.added.forEach((change) => handleAddedChanges(change));
  changes.deleted.forEach((change) => handleDeletedChanges(change));
  changes.updated.forEach((change) => handleUpdatedChanges(change));
}
