"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type CustomDialogProps = {
  title: string;
  description?: string;
  triggerLabel: string;
  icon: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

export function CustomDialog({
  title,
  description,
  triggerLabel,
  icon,
  children,
  footer,
}: CustomDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start cursor-pointer"
        >
          <span>{icon}</span>
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="p-3">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="max-h-[90vh] overflow-auto">{children}</div>

        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
