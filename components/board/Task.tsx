import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardTitle } from "../ui/card";
import { RxPencil2 } from "react-icons/rx";
import { RxTrash } from "react-icons/rx";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useAppContext } from "../providers/contextProvider";
import { ActionType } from "@/reducers/actions";

interface TaskProps {
  taskName: string;
  taskDesc: string;
  id: string;
  columnIdx: number;
}

export default function Task({ taskName, id, columnIdx }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newCardName, setNewCardName] = useState(taskName);
  const { state, dispatch } = useAppContext();
  const { cards: cardsInColumn } = state.data[columnIdx];

  const editTaskName = () => {
    setIsEditing(true);
  };

  const changeTaskName = () => {
    const cardToEdit = cardsInColumn.findIndex((card) => card.card_id === id);

    dispatch({
      type: ActionType.CHANGE_CARD_NAME,
      payload: { cardToEdit: cardToEdit, newName: newCardName, column: columnIdx },
    });
  };

  const deleteTask = () => {
    dispatch({
      type: ActionType.DELETE_CARD,
      payload: { cardToDelete: id, column: columnIdx },
    });
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCardName(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
    changeTaskName();
  };

  const onBlur = () => {
    setIsEditing(false);
    changeTaskName();
  };

  const DesctructiveModal = () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" variant="outline" className="bg-inherit">
            <RxTrash className="h-4 w-4 text-destructive" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-72">
          <DialogHeader>
            <DialogTitle>Delete Task?</DialogTitle>
            <DialogDescription>This action is irreversible</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button size="sm" variant="destructive" onClick={deleteTask}>
                Delete
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button size="sm" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <Card className="min-h-16 p-3 my-0.5 w-full bg-primary-foreground/30">
      {isEditing ? (
        <form onSubmit={onSubmit}>
          <Input autoFocus value={newCardName} onChange={handleOnChange} onBlur={onBlur} />
        </form>
      ) : (
        <CardTitle className="flex justify-between items-center text-md">
          {taskName !== "" ? taskName : "Untitled"}
          <div className="flex gap-1">
            <DesctructiveModal />
            <Button size="icon" variant="outline" className="bg-inherit" onClick={editTaskName}>
              <RxPencil2 className="h-4 w-4 dark:text-white text-black" />
            </Button>
          </div>
        </CardTitle>
      )}
    </Card>
  );
}
