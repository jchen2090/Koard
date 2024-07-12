import createSupabaseServerClient from "../serverClient";
import { CardSchema, DataSchema } from "@/app/project/page";
import { AddedChanges, ChangeTypesEnum } from "@/components/providers/types";

export function handleAddedChanges(change: AddedChanges) {
  if (change.type === ChangeTypesEnum.COLUMN) {
    const { columnData } = change.payload;
    insertNewColumns(columnData);
  } else if (change.type === ChangeTypesEnum.CARD) {
    const { cardData, columnId } = change.payload;
    insertNewCard(cardData, columnId);
  }
}

export async function insertNewColumns(column: DataSchema) {
  const supabase = await createSupabaseServerClient();
  const { column_name, column_id, color } = column;

  const { error } = await supabase.from("columns").insert({ column_name, column_id, color });

  if (error) {
    throw new Error(`Error while creating new columns: ${JSON.stringify(error)}`);
  }
}

export async function insertNewCard(card: CardSchema, column_id: string) {
  const supabase = await createSupabaseServerClient();
  const { card_id, card_desc, card_name } = card;

  const { error } = await supabase.from("cards").insert({ card_id, card_desc, card_name, column_id });

  if (error) {
    throw new Error(`Error while creating new cards" ${JSON.stringify(error)}`);
  }
}
