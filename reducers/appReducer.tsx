import { initialStateType } from "../components/providers/contextProvider";
import { ActionType, actionTypes } from "./actions";

export function appReducer(state: initialStateType, action: actionTypes): initialStateType {
  switch (action.type) {
    case ActionType.SET_DATA:
      return { ...state, data: action.payload };
    case ActionType.DELETE_CARD: {
      const { cardToDelete, column } = action.payload;
      const updatedCards = [...state.data];

      updatedCards[column].cards = updatedCards[column].cards.filter((card) => card.card_id !== cardToDelete);

      return { ...state, data: updatedCards };
    }
    case ActionType.ADD_COLUMN:
      return { ...state, data: [...state.data, action.payload] };
    case ActionType.ADD_CARD: {
      const { cardData, column } = action.payload;
      const updatedState = [...state.data];

      const updatedColumn = {
        ...updatedState[column],
        cards: [...updatedState[column].cards, cardData],
      };
      updatedState[column] = updatedColumn;

      return { ...state, data: updatedState };
    }
    case ActionType.CHANGE_CARD_NAME: {
      const { cardToEdit, newName, column } = action.payload;
      const updatedCards = [...state.data];

      updatedCards[column].cards[cardToEdit].card_name = newName;
      return { ...state, data: updatedCards };
    }
    case ActionType.EDIT_COLUMN_NAME: {
      const { newName, column } = action.payload;
      const updatedColumns = [...state.data];

      updatedColumns[column].column_name = newName;

      return { ...state, data: updatedColumns };
    }
    case ActionType.DELETE_COLUMN: {
      const { column } = action.payload;

      return { ...state, data: [...state.data.slice(0, column), ...state.data.slice(column + 1)] };
    }
    case ActionType.UPDATE_COLUMN_COLOR: {
      const { column, newColor } = action.payload;
      const updatedColumns = [...state.data];

      updatedColumns[column].color = newColor;

      return { ...state, data: updatedColumns };
    }
    default:
      throw new Error("Reducer action does not exist");
  }
}
