import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { RxChevronRight } from "react-icons/rx";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { DataSchema } from "@/app/project/page";

interface ColumnLabelProps {
  columnName: string;
  tasks: DataSchema;
  setTasks: Dispatch<SetStateAction<DataSchema>>;
}

export default function ColumnLabel({ tasks, setTasks, columnName }: ColumnLabelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState(columnName);

  const editColumnName = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newColumnName) {
      setIsOpen(false);
      return;
    }
    // Need to make a deep copy in order for react to rerender
    const updatedData = JSON.parse(JSON.stringify(tasks));
    updatedData[newColumnName] = tasks[columnName];
    delete updatedData[columnName];

    setTasks(updatedData);
    setIsOpen(false);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewColumnName(e.target.value);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className="text-sm mb-2 h-6 min-w-28 px-2">{columnName}</Button>
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