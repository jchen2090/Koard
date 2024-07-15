"use client";

import Column from "@/components/board/Column";
import NewColumnButton from "@/components/board/NewColumnButton";
import { DropResult, DragDropContext } from "@hello-pangea/dnd";
import { useEffect } from "react";
import { DataSchema } from "./page";
import { useAppContext } from "@/components/providers/contextProvider";
import { ActionType } from "@/reducers/actions";
import { syncData } from "@/lib/supabase/queries";
import { ChangeType } from "@/components/providers/types";

interface BoardProps {
  data: DataSchema[];
}

function hasChanges(changes: ChangeType) {
  return changes.added.length !== 0 || changes.deleted.length !== 0 || changes.updated.length !== 0;
}

export default function Board({ data }: BoardProps) {
  const { state, dispatch } = useAppContext();
  const { data: tasks } = state;

  useEffect(() => {
    dispatch({ type: ActionType.SET_DATA, payload: data });
  }, [data, dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!hasChanges(state.changes)) {
        return;
      }

      syncData(state.changes);
      dispatch({ type: ActionType.FLUSH_CHANGES });
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [state.changes, dispatch]);

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
        {tasks.map((_, idx) => (
          <Column columnIdx={idx} key={idx} />
        ))}
      </DragDropContext>
      <NewColumnButton />
    </div>
  );
}
