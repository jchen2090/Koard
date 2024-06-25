"use client";

import Column from "@/components/board/Column";
import NewColumnButton from "@/components/board/NewColumnButton";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useState } from "react";

export interface TaskSchema {
  id: string;
  taskName: string;
  taskDesc: string;
}

export interface ColumnSchema {
  columnName: string;
  data: TaskSchema[];
  color: string;
}

const sampleTasks: ColumnSchema[] = [
  {
    columnName: "Sample Data",
    data: [
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
    color: "Red",
  },
  {
    columnName: "Sample Data 2",
    data: [
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
    color: "Gray",
  },
  {
    columnName: "Sample Data 3",
    data: [
      {
        id: "3",
        taskName: "Sample name 4",
        taskDesc: "Sample desc 4",
      },
    ],
    color: "Blue",
  },
];

export default function Project() {
  const [tasks, setTasks] = useState(sampleTasks);

  //TODO: Minor optimizations potentially needed here
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const newColumn = destination.droppableId;
    const oldColumn = source.droppableId;
    const oldColumnIdx = tasks.findIndex((task) => task.columnName === oldColumn);
    const newColumnIdx = tasks.findIndex((task) => task.columnName === newColumn);

    /**
     * Check to see if user is trying to change columns or change order
     * of existing columns
     * if droppableIds are the same then it is the latter
     */
    if (source.droppableId !== destination.droppableId) {
      const dataToMove = tasks[oldColumnIdx].data[source.index];
      const newColumnData = tasks[newColumnIdx].data;
      const updatedOldColumn = tasks[oldColumnIdx].data;

      updatedOldColumn.splice(source.index, 1);

      const firstHalf = newColumnData.slice(0, destination.index);
      const secondHalf = newColumnData.slice(destination.index);
      const updatedNewColumnData = [...firstHalf, dataToMove, ...secondHalf];

      const updatedTasks = [...tasks];
      updatedTasks[oldColumnIdx].data = updatedOldColumn;
      updatedTasks[newColumnIdx].data = updatedNewColumnData;
      setTasks(updatedTasks);
    } else {
      const reOrderedColumn = tasks[oldColumnIdx].data;
      const oldIndex = source.index;
      const newIndex = destination.index;

      const [removedValue] = reOrderedColumn.splice(oldIndex, 1);
      reOrderedColumn.splice(newIndex, 0, removedValue);

      const updatedTasks = [...tasks];
      updatedTasks[oldColumnIdx].data = reOrderedColumn;
      setTasks(updatedTasks);
    }
  };

  return (
    <div className="flex flex-row gap-4 w-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        {tasks.map((_, idx) => (
          <Column tasks={tasks} setTasks={setTasks} columnIdx={idx} key={idx} />
        ))}
      </DragDropContext>
      <NewColumnButton tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
