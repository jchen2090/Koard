import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardTitle } from "./ui/card";
import { RxPencil2 } from "react-icons/rx";
import { RxTrash } from "react-icons/rx";
import { Input } from "./ui/input";
import { DataSchema } from "@/app/project/page";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

interface TaskProps {
  taskName: string;
  taskDesc: string;
  tasks: DataSchema;
  id: string;
  setTasks: Dispatch<SetStateAction<DataSchema>>;
  columnName: string;
}

export default function Task({ taskName, setTasks, id, tasks, columnName }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskName, setNewTaskName] = useState(taskName);
  const tasksInColumn = tasks[columnName].data;

  const editTaskName = () => {
    setIsEditing(true);
  };

  const changeTaskName = () => {
    const taskToEdit = tasksInColumn.filter((task) => task.id === id)?.at(0);

    if (!taskToEdit) {
      throw new Error("Task does not exist");
    }
    taskToEdit.taskName = newTaskName;
    setTasks({ ...tasks, [columnName]: { ...tasks[columnName], data: tasksInColumn } });
  };

  const deleteTask = () => {
    const updatedTasks = tasksInColumn.filter((task) => task.id !== id);
    setTasks({ ...tasks, [columnName]: { ...tasks[columnName], data: updatedTasks } });
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(e.target.value);
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
        <DialogContent className="w-72" onOpenAutoFocus={(e) => e.preventDefault()}>
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
          <Input autoFocus value={newTaskName} onChange={handleOnChange} onBlur={onBlur} />
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
