import { ChangeTypesEnum, UpdatedChanges } from "@/components/providers/types";
import createSupabaseServerClient from "../serverClient";
import { CardSchema, DataSchema } from "@/app/project/page";

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
    const { newColumn, oldColumn } = changes.payload;
    updateColumn(newColumn, oldColumn);
  } else if (changes.type === ChangeTypesEnum.CARD_ORDER) {
    const { columnId, newCardOrder } = changes.payload;
    updateCardOrder(columnId, newCardOrder);
  }
}

async function updateColor(columnId: string, newColor: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("columns").update({ color: newColor }).eq("column_id", columnId);

  if (error) {
    throw new Error(`Error while updating column color: ${JSON.stringify(error, null, 2)}`);
  }
}

async function updateCardName(cardId: string, newName: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("cards").update({ card_name: newName }).eq("card_id", cardId);

  if (error) {
    throw new Error(`Error while updating card name: ${JSON.stringify(error, null, 2)}`);
  }
}

async function updateColumnName(columnId: string, newName: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("columns").update({ column_name: newName }).eq("column_id", columnId);

  if (error) {
    throw new Error(`Error while updating column name: ${JSON.stringify(error, null, 2)}`);
  }
}

async function updateColumn(newColumn: DataSchema, oldColumn: DataSchema) {
  const supabase = await createSupabaseServerClient();
  const oldColumnId = oldColumn.column_id;
  const newColumnId = newColumn.column_id;

  const oldColumnUpsertPayload = oldColumn.cards.map((cards, index) => {
    return { card_id: cards.card_id, column_id: oldColumnId, index: index };
  });

  const newColumnUpsertPayload = newColumn.cards.map((cards, index) => {
    return { card_id: cards.card_id, column_id: newColumnId, index: index };
  });
  const { error } = await supabase.from("cards").upsert([...oldColumnUpsertPayload, ...newColumnUpsertPayload]);

  if (error) {
    throw new Error(`Error while updating columns: ${JSON.stringify(error, null, 2)}`);
  }
}

async function updateCardOrder(columnId: string, newCardOrder: CardSchema[]) {
  const supabase = await createSupabaseServerClient();

  const upsertPayoad = newCardOrder.map((card, index) => {
    return { column_id: columnId, card_id: card.card_id, index: index };
  });
  const { error } = await supabase.from("cards").upsert(upsertPayoad);

  if (error) {
    throw new Error(`Error while updating card order: ${JSON.stringify(error, null, 2)}`);
  }
}
