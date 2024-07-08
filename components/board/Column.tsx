import { Draggable, Droppable } from "@hello-pangea/dnd";
import Task from "./Task";
import { DataSchema } from "@/app/project/page";
import { Dispatch, SetStateAction } from "react";
import NewTaskButton from "./NewTaskButton";
import ColumnLabel from "./ColumnLabel";
import EditColumnDropDown from "./EditColumnDropDown";

interface ColumnProps {
  tasks: DataSchema[];
  columnIdx: number;
  setTasks: Dispatch<SetStateAction<DataSchema[]>>;
}

export interface ColumnHeaderProps {
  tasks: DataSchema[];
  setTasks: Dispatch<SetStateAction<DataSchema[]>>;
  columnName: string;
  column: number;
}

export default function Column({ tasks, columnIdx, setTasks }: ColumnProps) {
  const taskData = tasks[columnIdx].cards;
  const { column_name } = tasks[columnIdx];

  return (
    <div className="p-2 min-w-72">
      <span className="flex justify-between items-center group mb-2">
        <ColumnLabel tasks={tasks} setTasks={setTasks} column={columnIdx} columnName={column_name} />
        <EditColumnDropDown tasks={tasks} setTasks={setTasks} column={columnIdx} columnName={column_name} />
      </span>
      <Droppable droppableId={column_name}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col">
            {taskData.map((task, idx) => (
              <Draggable key={task.card_id} draggableId={task.card_id.toString()} index={idx}>
                {(provided) => (
                  <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <Task
                      taskName={task.card_name}
                      taskDesc={task.card_desc}
                      tasks={tasks}
                      setTasks={setTasks}
                      id={task.card_id}
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
