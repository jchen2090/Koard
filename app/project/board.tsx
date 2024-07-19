"use client";

import Column from "@/components/board/Column";
import NewColumnButton from "@/components/board/NewColumnButton";
import { DropResult, DragDropContext } from "@hello-pangea/dnd";
import { useEffect } from "react";
import { DataSchema } from "./page";
import { syncData } from "@/lib/supabase/queries";
import { ChangeType } from "@/components/providers/types";
import { useBoardContext } from "@/components/providers/boardStateProvider";
import { ActionType } from "@/reducers/board/actions";
import { useGlobalContext } from "@/components/providers/globalStateProvider";
import { GlobalActionType } from "@/reducers/global/actions";

interface BoardProps {
  data: DataSchema[];
}

function hasChanges(changes: ChangeType) {
  return changes.added.length !== 0 || changes.deleted.length !== 0 || changes.updated.length !== 0;
}

export default function Board({ data }: BoardProps) {
  const { state, dispatch } = useBoardContext();
  const { dispatch: globalStateDispatch } = useGlobalContext();

  useEffect(() => {
    if (!hasChanges(state.changes)) {
      return;
    }

    globalStateDispatch({ type: GlobalActionType.UPDATE_SYNC_STATUS, payload: { status: false } });
    const timeoutId = setTimeout(() => {
      syncData(state.changes).then(() => {
        dispatch({ type: ActionType.FLUSH_CHANGES });
        globalStateDispatch({ type: GlobalActionType.UPDATE_SYNC_STATUS, payload: { status: true } });
      });
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [state.changes, dispatch, globalStateDispatch]);

  //TODO: Minor optimizations potentially needed here
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    /**
     * Check to see if user is trying to change columns or change order
     * of existing columns
     * If droppableIds are different than user is trying to change columns
     */
    if (source.droppableId !== destination.droppableId) {
      dispatch({ type: ActionType.CHANGE_COLUMN, payload: { source, destination } });
    } else {
      dispatch({ type: ActionType.CHANGE_CARD_ORDER, payload: { source, destination } });
    }
  };

  return (
    <div className="flex flex-row gap-4 w-auto overflow-x-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        {state.data.map((_, idx) => (
          <Column columnIdx={idx} key={idx} />
        ))}
      </DragDropContext>
      <NewColumnButton />
    </div>
  );
}
