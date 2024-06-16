import { RxTrash } from "react-icons/rx";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
} from "./ui/dropdown-menu";
import { ColumnHeaderProps } from "./Column";

export default function EditColumnDropDown({ tasks, setTasks, columnName }: ColumnHeaderProps) {
  const deleteColumn = () => {
    // Need to make a deep copy in order for react to rerender
    const updatedTasks = JSON.parse(JSON.stringify(tasks));
    delete updatedTasks[columnName];
    setTasks(updatedTasks);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-6 px-2 opacity-0 group-hover:opacity-100 transition-opacity delay-75">
          ...
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={deleteColumn}>
            <RxTrash className="h-4 w-4 mr-2" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
