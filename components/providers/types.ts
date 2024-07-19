import { CardSchema, DataSchema } from "@/app/project/page";

export enum ChangeTypesEnum {
  CARD,
  COLUMN,
  CARD_NAME,
  COLUMN_NAME,
  COLOR,
  CARD_ORDER,
}

export type AddedChanges =
  | { type: ChangeTypesEnum.CARD; payload: { cardData: CardSchema; columnId: string; index: number } }
  | { type: ChangeTypesEnum.COLUMN; payload: { columnData: DataSchema } };

export type DeletedChanges =
  | { type: ChangeTypesEnum.CARD; payload: { cardId: string } }
  | { type: ChangeTypesEnum.COLUMN; payload: { columnId: string } };

export type UpdatedChanges =
  | { type: ChangeTypesEnum.CARD_NAME; payload: { cardId: string; newName: string } }
  | { type: ChangeTypesEnum.COLUMN_NAME; payload: { columnId: string; newName: string } }
  | { type: ChangeTypesEnum.COLOR; payload: { columnId: string; newColor: string } }
  | { type: ChangeTypesEnum.COLUMN; payload: { cardId: string; oldColumn: DataSchema; newColumn: DataSchema } }
  | { type: ChangeTypesEnum.CARD_ORDER; payload: { columnId: string; newCardOrder: CardSchema[] } };
export type ChangeType = {
  added: AddedChanges[];
  deleted: DeletedChanges[];
  updated: UpdatedChanges[];
};

export type initialStateType = {
  data: DataSchema[];
  changes: ChangeType;
  isSynced: boolean;
};
