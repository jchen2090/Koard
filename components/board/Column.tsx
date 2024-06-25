import { Draggable, Droppable } from "@hello-pangea/dnd";
import Task from "./Task";
import { ColumnSchema } from "@/app/project/page";
import { Dispatch, SetStateAction } from "react";
import NewTaskButton from "./NewTaskButton";
import ColumnLabel from "./ColumnLabel";
import EditColumnDropDown from "./EditColumnDropDown";

interface ColumnProps {
  tasks: ColumnSchema[];
  columnIdx: number;
  setTasks: Dispatch<SetStateAction<ColumnSchema[]>>;
}

export interface ColumnHeaderProps {
  tasks: ColumnSchema[];
  setTasks: Dispatch<SetStateAction<ColumnSchema[]>>;
  columnName: string;
  column: number;
}

export default function Column({ tasks, columnIdx, setTasks }: ColumnProps) {
  const taskData = tasks[columnIdx].data;
  const { columnName } = tasks[columnIdx];

  return (
    <div className="p-2 min-w-72">
      <span className="flex justify-between items-center group mb-2">
        <ColumnLabel tasks={tasks} setTasks={setTasks} column={columnIdx} columnName={columnName} />
        <EditColumnDropDown tasks={tasks} setTasks={setTasks} column={columnIdx} columnName={columnName} />
      </span>
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
                      columnIdx={columnIdx}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <NewTaskButton tasks={tasks} setTasks={setTasks} columnIdx={columnIdx} />
          </div>
        )}
      </Droppable>
    </div>
  );
}
