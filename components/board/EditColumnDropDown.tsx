import { RxTrash } from "react-icons/rx";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "../ui/dialog";
import { ColumnHeaderProps } from "./Column";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { useState } from "react";
import { columnDropdownConfig } from "./ColumnConfig";
import { useBoardContext } from "../providers/boardStateProvider";
import { ActionType } from "@/reducers/board/actions";

export default function EditColumnDropDowCn({ column }: ColumnHeaderProps) {
  const { state, dispatch } = useBoardContext();
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState(state.data[column].color);

  const deleteColumn = () => {
    dispatch({ type: ActionType.DELETE_COLUMN, payload: { column: column } });
  };

  const updateColumnColor = (e: any) => {
    e.preventDefault();
    const newColor = e.target.textContent;

    dispatch({ type: ActionType.UPDATE_COLUMN_COLOR, payload: { column: column, newColor: newColor } });
  };

  const DesctructiveModal = () => {
    return (
      <DialogContent className="w-72">
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

  const ColorOptions = () => {
    const colors = Object.keys(columnDropdownConfig);

    return colors.map((color, idx) => (
      <DropdownMenuRadioItem key={idx} value={color} onSelect={updateColumnColor}>
        <div className={`h-4 w-4 mr-2 rounded-sm ${columnDropdownConfig[color]}`} />
        <span>{color}</span>
      </DropdownMenuRadioItem>
    ));
  };

  return (
    <Dialog>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
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
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={color} onValueChange={setColor}>
            <DropdownMenuLabel className="text-xs ">Colors</DropdownMenuLabel>
            <ColorOptions />
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DesctructiveModal />
    </Dialog>
  );
}
