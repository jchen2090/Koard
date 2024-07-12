import { ChangeTypesEnum, DeletedChanges } from "@/components/providers/types";
import createSupabaseServerClient from "../serverClient";

export function handleDeletedChanges(change: DeletedChanges) {
  if (change.type === ChangeTypesEnum.COLUMN) {
    const { columnId } = change.payload;
    deleteColumn(columnId);
  } else if (change.type === ChangeTypesEnum.CARD) {
    const { cardId } = change.payload;
    deleteCard(cardId);
  }
}

async function deleteColumn(column_id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("columns").delete().eq("column_id", column_id);

  if (error) {
    throw new Error(`Error while deleteing column: ${JSON.stringify(error)}`);
  }
}

async function deleteCard(card_id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("cards").delete().eq("card_id", card_id);

  if (error) {
    throw new Error(`Error while deleteing card: ${JSON.stringify(error)}`);
  }
}
