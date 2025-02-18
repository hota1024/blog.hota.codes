"use client";

import { Loader2Icon, PlusIcon } from "lucide-react";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { $createTag } from "../actions/create-tag";
import { TagChip, TagChipProps } from "./tag-chip";

export interface MissingTagChipProps {
  tag: string;
  size?: TagChipProps["size"];
}

export function MissingTagChip({ tag, size = "medium" }: MissingTagChipProps) {
  const [, action, isPending] = useActionState($createTag, {});

  return (
    <Popover>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <PopoverTrigger asChild>
            <TooltipTrigger>
              <TagChip
                tag={{ slug: tag, title: tag }}
                size={size}
                noLink
                className={
                  "border-red-500 text-red-500 dark:border-red-300 dark:text-red-300"
                }
              />
            </TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent>クリックしてタグを作成</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent>
        <form className="grid gap-4" action={action}>
          <div className="space-y-2">
            <h4 className="font-bold leading-none">タグを作成</h4>
            <p className="text-sm text-muted-foreground">
              {tag} というタグを作成します。
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="tag-slug">スラッグ</Label>
              <Input
                id="tag-slug"
                name="slug"
                className="col-span-2 h-8"
                defaultValue={tag}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="tag-title">タイトル</Label>
              <Input
                id="tag-title"
                name="title"
                className="col-span-2 h-8"
                defaultValue={tag}
                autoFocus
                disabled={isPending}
              />
            </div>
            <Button type="submit" variant="secondary" disabled={isPending}>
              {isPending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <>
                  <PlusIcon />
                  作成
                </>
              )}
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
