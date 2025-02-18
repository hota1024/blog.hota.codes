import { NotebookPenIcon } from "lucide-react";
import { PropsWithChildren } from "react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/ui/alert";

export interface MessageProps extends PropsWithChildren {
  title: string;
}

export function TipMessage({ children }: MessageProps) {
  return (
    <Alert className="mt-[var(--block-margin-top)] border-green-500 bg-green-500/20">
      <NotebookPenIcon className="size-4" />
      <AlertTitle className="text-[1.2rem] font-bold">Tip</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
