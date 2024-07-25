import { RxChevronRight, RxPlus } from "react-icons/rx";
import { Button } from "../ui/button";
import { DataSchema } from "@/app/project/page";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { useBoardContext } from "../providers/boardStateProvider";
import { ActionType } from "@/reducers/board/actions";

const formSchema = z.object({
  columnName: z.string(),
});

export default function NewColumnButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useBoardContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      columnName: "",
    },
  });

  const createNewColumn = (values: z.infer<typeof formSchema>) => {
    const { columnName } = values;
    const columnExists = state.data.findIndex((data) => data.column_name === columnName) >= 0;

    if (columnName === "" || columnExists) {
      setIsOpen(false);
      return;
    }

    const newColumn: DataSchema = {
      column_name: columnName,
      cards: [],
      color: "Gray",
      column_id: self.crypto.randomUUID(),
    };
    dispatch({ type: ActionType.ADD_COLUMN, payload: newColumn });
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <RxPlus className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createNewColumn)}>
            <FormField
              control={form.control}
              name="columnName"
              render={({ field }) => (
                <div className="flex gap-2">
                  <FormItem>
                    <FormControl>
                      <Input placeholder="New group" {...field} />
                    </FormControl>
                  </FormItem>
                  <Button size="icon" className="p-3">
                    <RxChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            />
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
