"use client";

import Column from "@/components/Column";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useState } from "react";

export interface TaskSchema {
  id: string;
  taskName: string;
  taskDesc: string;
}

export interface DataSchema {
  [key: string]: TaskSchema[];
}

const sampleTasks: DataSchema = {
  "Sample Data": [
    {
      id: "0",
      taskName: "Sample name 1",
      taskDesc: "Sample desc 1",
    },
    {
      id: "1",
      taskName: "Sample name 2",
      taskDesc: "Sample desc 2",
    },
    {
      id: "4",
      taskName: "Sample name 5",
      taskDesc: "Sample desc 5",
    },
  ],
  "Sample Data 3": [
    {
      id: "2",
      taskName: "Sample name 3",
      taskDesc: "Sample desc 3",
    },
    {
      id: "5",
      taskName: "Sample name 6",
      taskDesc: "Sample desc 6",
    },
  ],
  "Sample Data 4": [
    {
      id: "3",
      taskName: "Sample name 4",
      taskDesc: "Sample desc 4",
    },
  ],
};

export default function Project() {
  const [tasks, setTasks] = useState(sampleTasks);
  const columns = Object.keys(tasks);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    /**
     * Check to see if user is trying to change columns or change order
     * of existing columns
     * if droppableIds are the same then it is the latter
     */
    if (source.droppableId !== destination.droppableId) {
      const newColumn = destination.droppableId;
      const dataToMove = tasks[source.droppableId][source.index];
      const newColumnData = tasks[newColumn];
      const updatedOldColumn = tasks[source.droppableId];

      updatedOldColumn.splice(source.index, 1);

      const firstHalf = newColumnData.slice(0, destination.index);
      const secondHalf = newColumnData.slice(destination.index);
      const updatedNewColumnData = [...firstHalf, dataToMove, ...secondHalf];

      setTasks({
        ...tasks,
        [source.droppableId]: updatedOldColumn,
        [destination.droppableId]: updatedNewColumnData,
      });
    } else {
      const reOrderedColumn = tasks[source.droppableId];
      const oldIndex = source.index;
      const newIndex = destination.index;

      const [removedValue] = reOrderedColumn.splice(oldIndex, 1);
      reOrderedColumn.splice(newIndex, 0, removedValue);

      setTasks({ ...tasks, [source.droppableId]: reOrderedColumn });
    }
  };

  return (
    <div className="flex flex-row gap-4 w-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((columnName, idx) => (
          <Column tasks={tasks} setTasks={setTasks} idx={idx} columnName={columnName} key={idx} />
        ))}
      </DragDropContext>
    </div>
  );
}
