import { CardSchema, DataSchema } from "@/app/project/page";
import { ChangeTypesEnum, globalStateType, initialStateType } from "@/components/providers/types";
import { ActionType, actionTypes } from "@/reducers/board/actions";
import { boardReducer } from "@/reducers/board/boardReducer";
import { GlobalActionType, globalActionTypes } from "@/reducers/global/actions";
import { globalReducer } from "@/reducers/global/globalReducer";
import { DraggableLocation } from "@hello-pangea/dnd";

describe("Global Reducer Tests", () => {
  it("Update Status", () => {
    const initialState: globalStateType = {
      isSynced: false,
    };

    const action: globalActionTypes = {
      type: GlobalActionType.UPDATE_SYNC_STATUS,
      payload: { status: true },
    };

    const expectedState = {
      isSynced: true,
    };
    expect(globalReducer(initialState, action)).toEqual(expectedState);
  });
});
