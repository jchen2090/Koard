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
  const { cards: cardData, column_name, column_id } = state.data[columnIdx];

  return (
    <Draggable draggableId={column_id} index={columnIdx}>
      {(provided) => (
        <div className="p-2 min-w-72 max-w-72 " {...provided.draggableProps} ref={provided.innerRef}>
          <span {...provided.dragHandleProps} className="flex justify-between items-center group mb-2">
            <ColumnLabel column={columnIdx} columnName={column_name} />
            <EditColumnDropDown column={columnIdx} columnName={column_name} />
          </span>
          <Droppable droppableId={column_name} type="card" direction="vertical">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col">
                {cardData.map((card, idx) => (
                  <div key={card.card_id}>
                    <Task card={card} columnIdx={columnIdx} index={idx} />
                  </div>
                ))}
                {provided.placeholder}
                <NewTaskButton columnIdx={columnIdx} />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
