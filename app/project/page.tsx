"use client";

import Column from "@/components/Column";
import NewColumnButton from "@/components/NewColumnButton";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useState } from "react";

export interface TaskSchema {
  id: string;
  taskName: string;
  taskDesc: string;
}

interface ColumnSchema {
  data: TaskSchema[];
  color: string;
}

export interface DataSchema {
  [key: string]: ColumnSchema;
}

const sampleTasks: DataSchema = {
  "Sample Data": {
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
  "Sample Data 3": {
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
  "Sample Data 4": {
    data: [
      {
        id: "3",
        taskName: "Sample name 4",
        taskDesc: "Sample desc 4",
      },
    ],
    color: "Blue",
  },
};

export default function Project() {
  const [tasks, setTasks] = useState(sampleTasks);
  const columns = Object.keys(tasks);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const newColumn = destination.droppableId;
    const oldColumn = source.droppableId;

    /**
     * Check to see if user is trying to change columns or change order
     * of existing columns
     * if droppableIds are the same then it is the latter
     */
    if (source.droppableId !== destination.droppableId) {
      const dataToMove = tasks[oldColumn].data[source.index];
      const newColumnData = tasks[newColumn].data;
      const updatedOldColumn = tasks[oldColumn].data;

      updatedOldColumn.splice(source.index, 1);

      const firstHalf = newColumnData.slice(0, destination.index);
      const secondHalf = newColumnData.slice(destination.index);
      const updatedNewColumnData = [...firstHalf, dataToMove, ...secondHalf];

      setTasks({
        ...tasks,
        [oldColumn]: { ...tasks[oldColumn], data: updatedOldColumn },
        [newColumn]: { ...tasks[newColumn], data: updatedNewColumnData },
      });
    } else {
      const reOrderedColumn = tasks[source.droppableId].data;
      const oldIndex = source.index;
      const newIndex = destination.index;

      const [removedValue] = reOrderedColumn.splice(oldIndex, 1);
      reOrderedColumn.splice(newIndex, 0, removedValue);

      setTasks({ ...tasks, [oldColumn]: { ...tasks[oldColumn], data: reOrderedColumn } });
    }
  };

  return (
    <div className="flex flex-row gap-4 w-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((columnName, idx) => (
          <Column tasks={tasks} setTasks={setTasks} idx={idx} columnName={columnName} key={idx} />
        ))}
      </DragDropContext>
      <NewColumnButton tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
