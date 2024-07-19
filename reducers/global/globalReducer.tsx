import { globalStateType } from "@/components/providers/types";
import { GlobalActionType, globalActionTypes } from "./actions";

export function globalReducer(state: globalStateType, action: globalActionTypes): globalStateType {
  switch (action.type) {
    case GlobalActionType.UPDATE_SYNC_STATUS: {
      const { status } = action.payload;
      return { ...state, isSynced: status };
    }
  }
}
