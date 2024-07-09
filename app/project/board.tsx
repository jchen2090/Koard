"use client";

import Column from "@/components/board/Column";
import NewColumnButton from "@/components/board/NewColumnButton";
import { DropResult, DragDropContext } from "@hello-pangea/dnd";
import { useEffect } from "react";
import { DataSchema } from "./page";
import { useAppContext } from "@/components/providers/contextProvider";
import { ActionType } from "@/reducers/actions";

interface BoardProps {
  data: DataSchema[];
}

export default function Board({ data }: BoardProps) {
  const { state, dispatch } = useAppContext();
  const { data: tasks } = state;

  useEffect(() => {
    dispatch({ type: ActionType.SET_DATA, payload: data });
  }, [data, dispatch]);

  //TODO: Minor optimizations potentially needed here
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const newColumn = destination.droppableId;
    const oldColumn = source.droppableId;
    const oldColumnIdx = tasks.findIndex((task) => task.column_name === oldColumn);
    const newColumnIdx = tasks.findIndex((task) => task.column_name === newColumn);

    /**
     * Check to see if user is trying to change columns or change order
     * of existing columns
     * if droppableIds are the same then it is the latter
     */
    if (source.droppableId !== destination.droppableId) {
      const dataToMove = tasks[oldColumnIdx].cards[source.index];
      const newColumnData = tasks[newColumnIdx].cards;
      const updatedOldColumn = tasks[oldColumnIdx].cards;

      updatedOldColumn.splice(source.index, 1);

      const firstHalf = newColumnData.slice(0, destination.index);
      const secondHalf = newColumnData.slice(destination.index);
      const updatedNewColumnData = [...firstHalf, dataToMove, ...secondHalf];

      const updatedTasks = [...tasks];
      updatedTasks[oldColumnIdx].cards = updatedOldColumn;
      updatedTasks[newColumnIdx].cards = updatedNewColumnData;
      dispatch({ type: ActionType.SET_DATA, payload: updatedTasks });
    } else {
      const reOrderedColumn = tasks[oldColumnIdx].cards;
      const oldIndex = source.index;
      const newIndex = destination.index;

      const [removedValue] = reOrderedColumn.splice(oldIndex, 1);
      reOrderedColumn.splice(newIndex, 0, removedValue);

      const updatedTasks = [...tasks];
      updatedTasks[oldColumnIdx].cards = reOrderedColumn;
      dispatch({ type: ActionType.SET_DATA, payload: updatedTasks });
    }
  };

  return (
    <div className="flex flex-row gap-4 w-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        {tasks.map((_, idx) => (
          <Column columnIdx={idx} key={idx} />
        ))}
      </DragDropContext>
      <NewColumnButton />
    </div>
  );
}
