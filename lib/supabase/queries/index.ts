import { DataSchema } from "@/app/project/page";
import createSupabaseServerClient from "../serverClient";

export async function getData() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("columns")
    .select(`column_name, color, cards (card_name, card_id)`)
    .returns<DataSchema[]>();

  if (error) {
    console.error(`Error when getting data ${error}`);
    return [];
  }
  return data;
}
