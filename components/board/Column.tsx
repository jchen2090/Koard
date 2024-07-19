import { Draggable, Droppable } from "@hello-pangea/dnd";
import Task from "./Task";
import NewTaskButton from "./NewTaskButton";
import ColumnLabel from "./ColumnLabel";
import EditColumnDropDown from "./EditColumnDropDown";
import { useBoardContext } from "../providers/boardStateProvider";

interface ColumnProps {
  columnIdx: number;
}

export interface ColumnHeaderProps {
  columnName: string;
  column: number;
}

export default function Column({ columnIdx }: ColumnProps) {
  const { state } = useBoardContext();
  const { cards: cardData, column_name } = state.data[columnIdx];

  return (
    <div className="p-2 min-w-72 max-w-72">
      <span className="flex justify-between items-center group mb-2">
        <ColumnLabel column={columnIdx} columnName={column_name} />
        <EditColumnDropDown column={columnIdx} columnName={column_name} />
      </span>
      <Droppable droppableId={column_name}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col">
            {cardData.map((task, idx) => (
              <Draggable key={task.card_id} draggableId={task.card_id.toString()} index={idx}>
                {(provided) => (
                  <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <Task taskName={task.card_name} taskDesc={task.card_desc} id={task.card_id} columnIdx={columnIdx} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <NewTaskButton columnIdx={columnIdx} />
          </div>
        )}
      </Droppable>
    </div>
  );
}
