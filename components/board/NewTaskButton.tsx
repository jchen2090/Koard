import { RxChevronRight, RxPlus } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { ColumnSchema, TaskSchema } from "@/app/project/page";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "../ui/input";

const formSchema = z.object({
  taskName: z.string(),
});

interface NewTaskButtonProps {
  tasks: ColumnSchema[];
  setTasks: Dispatch<SetStateAction<ColumnSchema[]>>;
  columnIdx: number;
}

export default function NewTaskButton({ tasks, setTasks, columnIdx }: NewTaskButtonProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskName: "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  const createNewCard = (values: z.infer<typeof formSchema>) => {
    const { taskName } = values;

    const cardInfo: TaskSchema = {
      id: self.crypto.randomUUID(),
      taskName: taskName,
      taskDesc: "test",
    };
    const updatedTasks = [...tasks];
    updatedTasks[columnIdx].data = [...tasks[columnIdx].data, cardInfo];
    setTasks(updatedTasks);
    form.reset();
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="text-foreground/50 justify-center">
          <RxPlus className="mr-1 h-4 w-4" />
          New
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createNewCard)}>
            <FormField
              control={form.control}
              name="taskName"
              render={({ field }) => (
                <div className="flex gap-2">
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Type a name..." {...field} />
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
