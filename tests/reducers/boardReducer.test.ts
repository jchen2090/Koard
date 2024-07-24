import { CardSchema, DataSchema } from "@/app/project/page";
import { ChangeTypesEnum, initialStateType } from "@/components/providers/types";
import { ActionType, actionTypes } from "@/reducers/board/actions";
import { boardReducer } from "@/reducers/board/boardReducer";
import { DraggableLocation } from "@hello-pangea/dnd";

describe("Board Reducer Add Actions", () => {
  it("Create new column", () => {
    const initialState: initialStateType = {
      data: [],
      changes: {
        added: [],
        updated: [],
        deleted: [],
      },
    };

    const payload: DataSchema = {
      column_name: "mock column",
      column_id: "AABBCC",
      cards: [],
      color: "Gray",
    };

    const action: actionTypes = {
      type: ActionType.ADD_COLUMN,
      payload: payload,
    };

    const expectedState = {
      ...initialState,
      data: [action.payload],
      changes: {
        ...initialState.changes,
        added: [{ type: ChangeTypesEnum.COLUMN, payload: { columnData: action.payload, index: 0 } }],
      },
    };
    expect(boardReducer(initialState, action)).toEqual(expectedState);
  });

  it("Create new card", () => {
    const initialState: initialStateType = {
      data: [{ column_name: "mock column", column_id: "AABBCC", cards: [], color: "Gray" }],
      changes: {
        added: [],
        updated: [],
        deleted: [],
      },
    };

    const newCard: CardSchema = {
      card_id: "DDEEFF",
      card_name: "Mock Card Name",
      card_desc: "Mock Card Desc",
    };

    const action: actionTypes = {
      type: ActionType.ADD_CARD,
      payload: { cardData: newCard, column: 0 },
    };

    const expectedState = {
      ...initialState,
      data: [
        {
          column_name: "mock column",
          column_id: "AABBCC",
          cards: [
            {
              card_id: "DDEEFF",
              card_name: "Mock Card Name",
              card_desc: "Mock Card Desc",
            },
          ],
          color: "Gray",
        },
      ],
      changes: {
        ...initialState.changes,
        added: [{ type: ChangeTypesEnum.CARD, payload: { cardData: newCard, columnId: "AABBCC", index: 0 } }],
      },
    };
    expect(boardReducer(initialState, action)).toEqual(expectedState);
  });
});

describe("Board Reducer Delete Actions", () => {
  it("Delete Column", () => {
    const initialState: initialStateType = {
      data: [{ column_name: "mock column", column_id: "AABBCC", cards: [], color: "Gray" }],
      changes: {
        added: [],
        updated: [],
        deleted: [],
      },
    };

    const action: actionTypes = {
      type: ActionType.DELETE_COLUMN,
      payload: { column: 0 },
    };

    const expectedState = {
      ...initialState,
      data: [],
      changes: {
        ...initialState.changes,
        deleted: [{ type: ChangeTypesEnum.COLUMN, payload: { columnId: "AABBCC" } }],
      },
    };
    expect(boardReducer(initialState, action)).toEqual(expectedState);
  });

  it("Delete Card", () => {
    const initialState: initialStateType = {
      data: [
        {
          column_name: "mock column",
          column_id: "aabbcc",
          cards: [{ card_name: "mock_card", card_id: "DDEEFF", card_desc: "mock_desc" }],
          color: "gray",
        },
      ],
      changes: {
        added: [],
        updated: [],
        deleted: [],
      },
    };

    const action: actionTypes = {
      type: ActionType.DELETE_CARD,
      payload: { cardToDelete: "DDEEFF", column: 0 },
    };

    const expectedState = {
      ...initialState,
      data: [{ column_name: "mock column", column_id: "aabbcc", cards: [], color: "gray" }],
      changes: {
        ...initialState.changes,
        deleted: [{ type: ChangeTypesEnum.CARD, payload: { cardId: action.payload.cardToDelete } }],
      },
    };
    expect(boardReducer(initialState, action)).toEqual(expectedState);
  });
});

describe("Board Reducer Update Actions", () => {
  it("Update Column Name", () => {
    const initialState: initialStateType = {
      data: [{ column_name: "mock column", column_id: "AABBCC", cards: [], color: "Gray" }],
      changes: {
        added: [],
        updated: [],
        deleted: [],
      },
    };

    const action: actionTypes = {
      type: ActionType.CHANGE_COLUMN_NAME,
      payload: { newName: "mock column rename", column: 0 },
    };

    const expectState = {
      ...initialState,
      data: [{ column_name: "mock column rename", column_id: "AABBCC", cards: [], color: "Gray" }],
      changes: {
        ...initialState.changes,
        updated: [
          {
            type: ChangeTypesEnum.COLUMN_NAME,
            payload: { newName: action.payload.newName, columnId: "AABBCC" },
          },
        ],
      },
    };
    expect(boardReducer(initialState, action)).toEqual(expectState);
  });

  it("Update Card Name", () => {
    const initialState: initialStateType = {
      data: [
        {
          column_name: "mock column",
          column_id: "aabbcc",
          cards: [{ card_name: "mock_card", card_id: "DDEEFF", card_desc: "mock_desc" }],
          color: "gray",
        },
      ],
      changes: {
        added: [],
        updated: [],
        deleted: [],
      },
    };

    const action: actionTypes = {
      type: ActionType.CHANGE_CARD_NAME,
      payload: {
        newName: "mock card rename",
        column: 0,
        cardToEdit: 0,
      },
    };

    const expectedState = {
      ...initialState,
      data: [
        {
          column_name: "mock column",
          column_id: "aabbcc",
          cards: [{ card_name: "mock card rename", card_id: "DDEEFF", card_desc: "mock_desc" }],
          color: "gray",
        },
      ],
      changes: {
        ...initialState.changes,
        updated: [
          {
            type: ChangeTypesEnum.CARD_NAME,
            payload: { cardId: "DDEEFF", newName: action.payload.newName },
          },
        ],
      },
    };
    expect(boardReducer(initialState, action)).toEqual(expectedState);
  });

  it("Update Column Color", () => {
    const initialState: initialStateType = {
      data: [{ column_name: "mock column", column_id: "AABBCC", cards: [], color: "Gray" }],
      changes: {
        added: [],
        updated: [],
        deleted: [],
      },
    };

    const action: actionTypes = {
      type: ActionType.UPDATE_COLUMN_COLOR,
      payload: { column: 0, newColor: "Blue" },
    };

    const expectedState = {
      ...initialState,
      data: [{ column_name: "mock column", column_id: "AABBCC", cards: [], color: "Blue" }],
      changes: {
        ...initialState.changes,
        updated: [{ type: ChangeTypesEnum.COLOR, payload: { columnId: "AABBCC", newColor: "Blue" } }],
      },
    };
    expect(boardReducer(initialState, action)).toEqual(expectedState);
  });

  it("Update Column", () => {
    const initialState: initialStateType = {
      data: [
        {
          column_name: "mock column 1",
          column_id: "AABBCC",
          cards: [{ card_name: "mock card 1", card_id: "AAA123", card_desc: "mock desc" }],
          color: "Gray",
        },
        {
          column_name: "mock column 2",
          column_id: "DDEEFF",
          cards: [{ card_name: "mock card 2", card_id: "BBB123", card_desc: "mock desc" }],
          color: "Gray",
        },
      ],
      changes: {
        added: [],
        deleted: [],
        updated: [],
      },
    };

    const mockSource: DraggableLocation = {
      index: 0,
      droppableId: "mock column 2",
    };

    const mockDestination: DraggableLocation = {
      index: 0,
      droppableId: "mock column 1",
    };

    const action: actionTypes = {
      type: ActionType.CHANGE_COLUMN,
      payload: { source: mockSource, destination: mockDestination },
    };

    const expectedState = {
      ...initialState,
      data: [
        {
          column_name: "mock column 1",
          column_id: "AABBCC",
          cards: [
            { card_name: "mock card 2", card_id: "BBB123", card_desc: "mock desc" },
            { card_name: "mock card 1", card_id: "AAA123", card_desc: "mock desc" },
          ],
          color: "Gray",
        },
        {
          column_name: "mock column 2",
          column_id: "DDEEFF",
          cards: [],
          color: "Gray",
        },
      ],
      changes: {
        ...initialState.changes,
        updated: [
          {
            type: ChangeTypesEnum.COLUMN,
            payload: {
              cardId: "BBB123",
              oldColumn: {
                column_name: "mock column 2",
                column_id: "DDEEFF",
                cards: [],
                color: "Gray",
              },
              newColumn: {
                column_name: "mock column 1",
                column_id: "AABBCC",
                cards: [
                  { card_name: "mock card 2", card_id: "BBB123", card_desc: "mock desc" },
                  { card_name: "mock card 1", card_id: "AAA123", card_desc: "mock desc" },
                ],
                color: "Gray",
              },
            },
          },
        ],
      },
    };
    expect(boardReducer(initialState, action)).toEqual(expectedState);
  });

  it("Update Card Order", () => {
    const initialState: initialStateType = {
      data: [
        {
          column_name: "mock column 1",
          column_id: "AABBCC",
          cards: [
            { card_name: "mock card 1", card_id: "AAA123", card_desc: "mock desc" },
            { card_name: "mock card 2", card_id: "BBB123", card_desc: "mock desc" },
          ],
          color: "Gray",
        },
      ],
      changes: {
        added: [],
        deleted: [],
        updated: [],
      },
    };

    const mockSource: DraggableLocation = {
      droppableId: "mock column 1",
      index: 1,
    };

    const mockDestination: DraggableLocation = {
      droppableId: "mock column 1",
      index: 0,
    };

    const action: actionTypes = {
      type: ActionType.CHANGE_CARD_ORDER,
      payload: { source: mockSource, destination: mockDestination },
    };

    const expectedState = {
      ...initialState,
      data: [
        {
          column_name: "mock column 1",
          column_id: "AABBCC",
          cards: [
            { card_name: "mock card 2", card_id: "BBB123", card_desc: "mock desc" },
            { card_name: "mock card 1", card_id: "AAA123", card_desc: "mock desc" },
          ],
          color: "Gray",
        },
      ],
      changes: {
        ...initialState.changes,
        updated: [
          {
            type: ChangeTypesEnum.CARD_ORDER,
            payload: {
              columnId: "AABBCC",
              newCardOrder: [
                { card_name: "mock card 2", card_id: "BBB123", card_desc: "mock desc" },
                { card_name: "mock card 1", card_id: "AAA123", card_desc: "mock desc" },
              ],
            },
          },
        ],
      },
    };
    expect(boardReducer(initialState, action)).toEqual(expectedState);
  });

  it("Update Column Order", () => {
    const initialState: initialStateType = {
      data: [
        {
          column_name: "mock column 1",
          column_id: "AABBCC",
          cards: [],
          color: "Gray",
        },
        {
          column_name: "mock column 2",
          column_id: "DDEEFF",
          cards: [],
          color: "Gray",
        },
      ],
      changes: {
        added: [],
        deleted: [],
        updated: [],
      },
    };

    const mockSource: DraggableLocation = {
      droppableId: "mock column 2",
      index: 1,
    };

    const mockDestination: DraggableLocation = {
      droppableId: "mock column 1",
      index: 0,
    };

    const action: actionTypes = {
      type: ActionType.CHANGE_COLUMN_ORDER,
      payload: { source: mockSource, destination: mockDestination },
    };

    const expectedState = {
      ...initialState,
      data: [
        {
          column_name: "mock column 2",
          column_id: "DDEEFF",
          cards: [],
          color: "Gray",
        },
        {
          column_name: "mock column 1",
          column_id: "AABBCC",
          cards: [],
          color: "Gray",
        },
      ],
      changes: {
        ...initialState.changes,
        updated: [
          {
            type: ChangeTypesEnum.COLUMN_ORDER,
            payload: {
              newColumnOrder: [
                {
                  column_name: "mock column 2",
                  column_id: "DDEEFF",
                  cards: [],
                  color: "Gray",
                },
                {
                  column_name: "mock column 1",
                  column_id: "AABBCC",
                  cards: [],
                  color: "Gray",
                },
              ],
            },
          },
        ],
      },
    };
    expect(boardReducer(initialState, action)).toEqual(expectedState);
  });
});

describe("Additional Tests", () => {
  it("Flush Changes", () => {
    const initialState: initialStateType = {
      data: [],
      changes: {
        added: [
          {
            type: ChangeTypesEnum.CARD,
            payload: {
              cardData: { card_name: "mock name", card_desc: "mock desc", card_id: "mock id" },
              columnId: "mock",
              index: 0,
            },
          },
        ],
        deleted: [],
        updated: [],
      },
    };

    const action: actionTypes = {
      type: ActionType.FLUSH_CHANGES,
    };

    const expectedState: initialStateType = {
      data: [],
      changes: {
        added: [],
        deleted: [],
        updated: [],
      },
    };
    expect(boardReducer(initialState, action)).toEqual(expectedState);
  });
});
