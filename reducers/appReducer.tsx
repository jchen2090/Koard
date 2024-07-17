import { ChangeTypesEnum, initialStateType } from "@/components/providers/types";
import { ActionType, actionTypes } from "./actions";

//TODO: Data should be sanitized before added to changes,
// i,e if we change the name of a card multiple times we should only save the most recent
// change
export function appReducer(state: initialStateType, action: actionTypes): initialStateType {
  switch (action.type) {
    case ActionType.SET_DATA:
      return { ...state, data: action.payload };
    case ActionType.DELETE_CARD: {
      const { cardToDelete, column } = action.payload;
      const updatedCards = [...state.data];

      updatedCards[column].cards = updatedCards[column].cards.filter((card) => card.card_id !== cardToDelete);

      return {
        ...state,
        data: updatedCards,
        changes: {
          ...state.changes,

          added: [
            ...state.changes.added.filter((addition) => {
              if (addition.type === ChangeTypesEnum.CARD) {
                return addition.payload.cardData.card_id !== cardToDelete;
              }
              return true;
            }),
          ],

          updated: [
            ...state.changes.updated.filter((update) => {
              if (update.type === ChangeTypesEnum.COLUMN || update.type === ChangeTypesEnum.CARD_NAME) {
                return update.payload.cardId !== cardToDelete;
              }
              return true;
            }),
          ],

          deleted: [...state.changes.deleted, { type: ChangeTypesEnum.CARD, payload: { cardId: cardToDelete } }],
        },
      };
    }
    case ActionType.ADD_COLUMN:
      return {
        ...state,
        data: [...state.data, action.payload],
        changes: {
          ...state.changes,
          added: [...state.changes.added, { type: ChangeTypesEnum.COLUMN, payload: { columnData: action.payload } }],
        },
      };
    case ActionType.ADD_CARD: {
      const { cardData, column } = action.payload;
      const columnUid = state.data[column].column_id;
      const updatedState = [...state.data];

      const updatedColumn = {
        ...updatedState[column],
        cards: [...updatedState[column].cards, cardData],
      };
      updatedState[column] = updatedColumn;

      return {
        ...state,
        data: updatedState,
        changes: {
          ...state.changes,
          added: [
            ...state.changes.added,
            { type: ChangeTypesEnum.CARD, payload: { cardData: cardData, columnId: columnUid } },
          ],
        },
      };
    }
    case ActionType.CHANGE_CARD_NAME: {
      const { cardToEdit, newName, column } = action.payload;
      const cardId = state.data[column].cards[cardToEdit].card_id;
      const updatedCards = [...state.data];

      updatedCards[column].cards[cardToEdit].card_name = newName;
      return {
        ...state,
        data: updatedCards,
        changes: {
          ...state.changes,
          updated: [
            ...state.changes.updated.filter((update) => {
              if (update.type === ChangeTypesEnum.CARD_NAME) {
                return update.payload.cardId !== cardId;
              }
              return true;
            }),
            { type: ChangeTypesEnum.CARD_NAME, payload: { cardId: cardId, newName: newName } },
          ],
        },
      };
    }
    case ActionType.EDIT_COLUMN_NAME: {
      const { newName, column } = action.payload;
      const columnId = state.data[column].column_id;
      const updatedColumns = [...state.data];

      updatedColumns[column].column_name = newName;

      return {
        ...state,
        data: updatedColumns,
        changes: {
          ...state.changes,
          updated: [
            ...state.changes.updated.filter((update) => {
              if (update.type === ChangeTypesEnum.COLUMN_NAME) {
                return update.payload.columnId !== columnId;
              }
              return true;
            }),
            { type: ChangeTypesEnum.COLUMN_NAME, payload: { columnId: columnId, newName: newName } },
          ],
        },
      };
    }
    case ActionType.DELETE_COLUMN: {
      const { column } = action.payload;
      const columnId = state.data[column].column_id;

      return {
        ...state,
        data: [...state.data.slice(0, column), ...state.data.slice(column + 1)],
        changes: {
          ...state.changes,

          added: [
            ...state.changes.added.filter((addition) => {
              if (addition.type === ChangeTypesEnum.COLUMN) {
                return addition.payload.columnData.column_id !== columnId;
              }
              return true;
            }),
          ],

          updated: [
            ...state.changes.updated.filter((update) => {
              if (update.type === ChangeTypesEnum.COLUMN_NAME || update.type === ChangeTypesEnum.COLOR) {
                return update.payload.columnId !== columnId;
              } else if (update.type === ChangeTypesEnum.COLUMN) {
                return update.payload.newColumnId !== columnId;
              }
              return true;
            }),
          ],

          deleted: [
            ...state.changes.deleted,
            {
              type: ChangeTypesEnum.COLUMN,
              payload: { columnId: columnId },
            },
          ],
        },
      };
    }
    case ActionType.UPDATE_COLUMN_COLOR: {
      const { column, newColor } = action.payload;
      const columnId = state.data[column].column_id;
      const updatedColumns = [...state.data];

      updatedColumns[column].color = newColor;

      return {
        ...state,
        data: updatedColumns,
        changes: {
          ...state.changes,
          updated: [
            ...state.changes.updated.filter((update) => {
              if (update.type === ChangeTypesEnum.COLOR) {
                return update.payload.columnId !== columnId;
              }
              return true;
            }),
            { type: ChangeTypesEnum.COLOR, payload: { columnId: columnId, newColor: newColor } },
          ],
        },
      };
    }
    case ActionType.CHANGE_COLUMN: {
      const { source, destination } = action.payload;
      const { index: oldColumnCardIdx } = source;
      const { index: newColumnCardIdx } = destination;
      const newState = [...state.data];

      const oldColumn = state.data.findIndex((column) => column.column_name === source.droppableId);
      const newColumn = state.data.findIndex((column) => column.column_name === destination.droppableId);
      const cardToMove = state.data[oldColumn].cards[oldColumnCardIdx];

      const updatedOldColumn = newState[oldColumn].cards.filter((card) => card.card_id !== cardToMove.card_id);
      newState[oldColumn] = {
        ...newState[oldColumn],
        cards: updatedOldColumn,
      };

      const newColumnCards = newState[newColumn].cards;
      newState[newColumn] = {
        ...newState[newColumn],
        cards: [...newColumnCards.slice(0, newColumnCardIdx), cardToMove, ...newColumnCards.slice(newColumnCardIdx)],
      };

      return {
        ...state,
        data: newState,
        changes: {
          ...state.changes,
          updated: [
            ...state.changes.updated.filter((update) => {
              if (update.type === ChangeTypesEnum.COLUMN) {
                return update.payload.cardId !== cardToMove.card_id;
              }
              return true;
            }),
            {
              type: ChangeTypesEnum.COLUMN,
              payload: { cardId: cardToMove.card_id, newColumnId: newState[newColumn].column_id },
            },
          ],
        },
      };
    }
    //TODO: Figure out how to change order on supabase
    case ActionType.CHANGE_CARD_ORDER: {
      const { source, destination } = action.payload;
      const { index: oldCardIdx } = source;
      const { index: newCardIdx } = destination;
      const newState = [...state.data];

      const columnIdx = state.data.findIndex((column) => column.column_name === source.droppableId);
      const cardToMove = state.data[columnIdx].cards[oldCardIdx];

      const cardsInColumn = [
        ...newState[columnIdx].cards.slice(0, oldCardIdx),
        ...newState[columnIdx].cards.slice(oldCardIdx + 1),
      ];

      newState[columnIdx] = {
        ...newState[columnIdx],
        cards: [...cardsInColumn.slice(0, newCardIdx), cardToMove, ...cardsInColumn.slice(newCardIdx)],
      };

      return { ...state, data: newState };
    }
    case ActionType.FLUSH_CHANGES: {
      return {
        ...state,
        changes: {
          added: [],
          deleted: [],
          updated: [],
        },
      };
    }
    default:
      throw new Error("Reducer action does not exist");
  }
}
