import { ChangeEvent, FormEvent, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RxChevronRight } from "react-icons/rx";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ColumnHeaderProps } from "./Column";
import { columnLabelConfig } from "./ColumnConfig";
import { useAppContext } from "../providers/contextProvider";
import { ActionType } from "@/reducers/actions";

export default function ColumnLabel({ column, columnName }: ColumnHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState(columnName);
  const { state, dispatch } = useAppContext();

  const editColumnName = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newColumnName || newColumnName === columnName) {
      setIsOpen(false);
      return;
    }

    dispatch({
      type: ActionType.EDIT_COLUMN_NAME,
      payload: { newName: newColumnName, column: column },
    });
    setIsOpen(false);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewColumnName(e.target.value);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className={`text-sm h-6 px-4 ${columnLabelConfig[state.data[column].color]} text-black dark:text-white`}
        >
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
