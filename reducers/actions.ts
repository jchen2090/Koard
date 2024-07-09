import { CardSchema, DataSchema } from "@/app/project/page";

export enum ActionType {
  SET_DATA,
  ADD_CARD,
  DELETE_CARD,
  ADD_COLUMN,
  CHANGE_CARD_NAME,
  EDIT_COLUMN_NAME,
  DELETE_COLUMN,
  UPDATE_COLUMN_COLOR,
}

type removeCardAction = {
  type: ActionType.DELETE_CARD;
  payload: { cardToDelete: string; column: number };
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

export type actionTypes =
  | removeCardAction
  | addCardAction
  | setDataAction
  | addColumnAction
  | changeCardNameAction
  | editColumnNameAction
  | deleteColumnAction
  | updateColumnColorAction;
