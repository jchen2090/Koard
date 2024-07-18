import { CardSchema, DataSchema } from "@/app/project/page";
import { DraggableLocation } from "@hello-pangea/dnd";

export enum ActionType {
  SET_DATA,
  ADD_CARD,
  DELETE_CARD,
  ADD_COLUMN,
  CHANGE_CARD_NAME,
  EDIT_COLUMN_NAME,
  DELETE_COLUMN,
  UPDATE_COLUMN_COLOR,
  CHANGE_CARD_ORDER,
  CHANGE_COLUMN,
  FLUSH_CHANGES,
  UPDATE_SYNC_STATUS,
}

type removeCardAction = {
  type: ActionType.DELETE_CARD;
  payload: { cardToDelete: string; column: number };
};

type changeCardOrderAction = {
  type: ActionType.CHANGE_CARD_ORDER;
  payload: { source: DraggableLocation; destination: DraggableLocation };
};

type changeColumnAction = {
  type: ActionType.CHANGE_COLUMN;
  payload: { source: DraggableLocation; destination: DraggableLocation };
};

type flushChangesAction = {
  type: ActionType.FLUSH_CHANGES;
};

type addCardAction = {
  type: ActionType.ADD_CARD;
  payload: { cardData: CardSchema; column: number };
};

type setDataAction = {
  type: ActionType.SET_DATA;
  payload: DataSchema[];
};

type addColumnAction = {
  type: ActionType.ADD_COLUMN;
  payload: DataSchema;
};

type changeCardNameAction = {
  type: ActionType.CHANGE_CARD_NAME;
  payload: { cardToEdit: number; newName: string; column: number };
};

type editColumnNameAction = {
  type: ActionType.EDIT_COLUMN_NAME;
  payload: { newName: string; column: number };
};

type deleteColumnAction = {
  type: ActionType.DELETE_COLUMN;
  payload: { column: number };
};

type updateColumnColorAction = {
  type: ActionType.UPDATE_COLUMN_COLOR;
  payload: { newColor: string; column: number };
};

type updateSyncStatusAction = {
  type: ActionType.UPDATE_SYNC_STATUS;
  payload: { status: boolean };
};

export type actionTypes =
  | removeCardAction
  | addCardAction
  | setDataAction
  | addColumnAction
  | changeCardNameAction
  | editColumnNameAction
  | deleteColumnAction
  | updateColumnColorAction
  | changeCardOrderAction
  | changeColumnAction
  | flushChangesAction
  | updateSyncStatusAction;
