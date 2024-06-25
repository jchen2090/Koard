import { ChangeEvent, FormEvent, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RxChevronRight } from "react-icons/rx";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ColumnHeaderProps } from "./Column";
import { columnLabelConfig } from "./ColumnConfig";

export default function ColumnLabel({ tasks, setTasks, column, columnName }: ColumnHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState(columnName);

  const editColumnName = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newColumnName || newColumnName === columnName) {
      setIsOpen(false);
      return;
    }
    // Need to make a deep copy in order for react to rerender
    const updatedData = JSON.parse(JSON.stringify(tasks));
    updatedData[column].columnName = newColumnName;

    setTasks(updatedData);
    setIsOpen(false);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewColumnName(e.target.value);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className={`text-sm h-6 px-4 ${columnLabelConfig[tasks[column].color]} text-black dark:text-white`}>
          {columnName}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={editColumnName} className="flex gap-2">
          <Input autoFocus value={newColumnName} onChange={handleOnChange} />
          <Button size="icon" className="p-3">
            <RxChevronRight className="h-4 w-4" />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
