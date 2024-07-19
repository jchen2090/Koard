export enum GlobalActionType {
  UPDATE_SYNC_STATUS,
}

type updateSyncStatusAction = {
  type: GlobalActionType.UPDATE_SYNC_STATUS;
  payload: { status: boolean };
};

export type globalActionTypes = updateSyncStatusAction;
