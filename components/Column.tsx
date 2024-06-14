import { Draggable, Droppable } from "@hello-pangea/dnd";
import Task from "./Task";
import { DataSchema } from "@/app/project/page";
import { Dispatch, SetStateAction } from "react";
import NewTaskButton from "./NewTaskButton";
import ColumnLabel from "./ColumnLabel";

interface ColumnProps {
  tasks: DataSchema;
  idx: number;
  columnName: string;
  setTasks: Dispatch<SetStateAction<DataSchema>>;
}

export default function Column({ tasks, idx, columnName, setTasks }: ColumnProps) {
  const taskData = tasks[columnName];

  return (
    <div key={idx} className="p-2 w-72">
      <ColumnLabel tasks={tasks} setTasks={setTasks} columnName={columnName} />
      <Droppable droppableId={columnName}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col">
            {taskData.map((task, idx) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={idx}>
                {(provided) => (
                  <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <Task
                      taskName={task.taskName}
                      taskDesc={task.taskDesc}
                      tasks={tasks}
                      setTasks={setTasks}
                      id={task.id}
                      columnName={columnName}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <NewTaskButton tasks={tasks} setTasks={setTasks} columnName={columnName} />
          </div>
        )}
      </Droppable>
    </div>
  );
}
