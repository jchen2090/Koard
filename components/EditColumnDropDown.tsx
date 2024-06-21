import { RxTrash } from "react-icons/rx";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
} from "./ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "./ui/dialog";
import { ColumnHeaderProps } from "./Column";
import { DialogHeader, DialogFooter } from "./ui/dialog";

export default function EditColumnDropDown({ tasks, setTasks, columnName }: ColumnHeaderProps) {
  const deleteColumn = () => {
    // Need to make a deep copy in order for react to rerender
    const updatedTasks = JSON.parse(JSON.stringify(tasks));
    delete updatedTasks[columnName];
    setTasks(updatedTasks);
  };

  const DesctructiveModal = () => {
    return (
      <DialogContent className="w-72" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Delete Column?</DialogTitle>
          <DialogDescription>This will delete all tasks</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button size="sm" variant="destructive" onClick={deleteColumn}>
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
    );
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-6 px-2 opacity-0 group-hover:opacity-100 transition-opacity delay-75">
            ...
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <RxTrash className="h-4 w-4 mr-2" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DesctructiveModal />
    </Dialog>
  );
}
