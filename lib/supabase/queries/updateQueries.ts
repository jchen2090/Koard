import { ChangeTypesEnum, UpdatedChanges } from "@/components/providers/types";
import createSupabaseServerClient from "../serverClient";

//TODO: Need to implement changes in card order
export function handleUpdatedChanges(changes: UpdatedChanges) {
  if (changes.type === ChangeTypesEnum.COLOR) {
    const { columnId, newColor } = changes.payload;
    updateColor(columnId, newColor);
  } else if (changes.type === ChangeTypesEnum.CARD_NAME) {
    const { cardId, newName } = changes.payload;
    updateCardName(cardId, newName);
  } else if (changes.type === ChangeTypesEnum.COLUMN_NAME) {
    const { columnId, newName } = changes.payload;
    updateColumnName(columnId, newName);
  } else if (changes.type === ChangeTypesEnum.COLUMN) {
    const { cardId, newColumnId } = changes.payload;
    updateColumn(cardId, newColumnId);
  }
}

async function updateColor(columnId: string, newColor: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("columns").update({ color: newColor }).eq("column_id", columnId);

  if (error) {
    throw new Error(`Error while updating column color: ${JSON.stringify(error)}`);
  }
}

async function updateCardName(cardId: string, newName: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("cards").update({ card_name: newName }).eq("card_id", cardId);

  if (error) {
    throw new Error(`Error while updating card name: ${JSON.stringify(error)}`);
  }
}

async function updateColumnName(columnId: string, newName: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("columns").update({ column_name: newName }).eq("column_id", columnId);

  if (error) {
    throw new Error(`Error while updating column name: ${JSON.stringify(error)}`);
  }
}

async function updateColumn(cardId: string, newColumnId: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("cards").update({ column_id: newColumnId }).eq("card_id", cardId);

  if (error) {
    throw new Error(`Error while updating card column: ${JSON.stringify(error)}`);
  }
}
