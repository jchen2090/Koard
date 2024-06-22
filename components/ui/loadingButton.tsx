import { RxReload } from "react-icons/rx";
import { Button } from "@/components/ui/button";

export function LoadingButton() {
  return (
    <Button disabled className="mt-2">
      <RxReload className="mr-2 h-4 w-4 animate-spin" />
    </Button>
  );
}
