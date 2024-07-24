import createSupabaseServerClient from "../serverClient";
import { CardSchema, DataSchema } from "@/app/project/page";
import { AddedChanges, ChangeTypesEnum } from "@/components/providers/types";

export function handleAddedChanges(change: AddedChanges) {
  if (change.type === ChangeTypesEnum.COLUMN) {
    const { columnData, index } = change.payload;
    insertNewColumns(columnData, index);
  } else if (change.type === ChangeTypesEnum.CARD) {
    const { cardData, columnId, index } = change.payload;
    insertNewCard(cardData, columnId, index);
  }
}

export async function insertNewColumns(column: DataSchema, index: number) {
  const supabase = await createSupabaseServerClient();
  const { column_name, column_id, color } = column;

  const { error } = await supabase.from("columns").insert({ column_name, column_id, color, index });

  if (error) {
    throw new Error(`Error while creating new columns: ${JSON.stringify(error)}`);
  }
}

export async function insertNewCard(card: CardSchema, column_id: string, index: number) {
  const supabase = await createSupabaseServerClient();
  const { card_id, card_desc, card_name } = card;

  const { error } = await supabase.from("cards").insert({ card_id, card_desc, card_name, column_id, index });

  if (error) {
    throw new Error(`Error while creating new cards" ${JSON.stringify(error)}`);
  }
}
