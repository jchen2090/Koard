"use client";

import Column from "@/components/board/Column";
import NewColumnButton from "@/components/board/NewColumnButton";
import { DropResult, DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useEffect } from "react";
import { syncData } from "@/lib/supabase/queries";
import { ChangeType } from "@/components/providers/types";
import { useBoardContext } from "@/components/providers/boardStateProvider";
import { ActionType } from "@/reducers/board/actions";
import { useGlobalContext } from "@/components/providers/globalStateProvider";
import { GlobalActionType } from "@/reducers/global/actions";

function hasChanges(changes: ChangeType) {
  return changes.added.length !== 0 || changes.deleted.length !== 0 || changes.updated.length !== 0;
}

export default function Board() {
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
    const { source, destination, type } = result;
    const moveToNewColumn = source.droppableId !== destination?.droppableId;
    const hasChangedOrder = !moveToNewColumn && source.index !== destination?.index;

    if (!destination) {
      return;
    }

    if (type === "card") {
      if (moveToNewColumn) {
        dispatch({ type: ActionType.CHANGE_COLUMN, payload: { source, destination } });
      } else {
        if (!hasChangedOrder) {
          return;
        }
        dispatch({ type: ActionType.CHANGE_CARD_ORDER, payload: { source, destination } });
      }
    } else {
      if (!hasChangedOrder) {
        return;
      }
      dispatch({ type: ActionType.CHANGE_COLUMN_ORDER, payload: { source, destination } });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-row w-auto overflow-x-auto mt-4 ml-2"
          >
            {state.data.map((column, idx) => (
              <Column columnIdx={idx} key={column.column_id} />
            ))}
            {provided.placeholder}
            <NewColumnButton />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
