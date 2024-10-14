import React from "react";
import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const Header = ({ className }: Props) => {
  return <header className={cn("border border-b", className)}></header>;
};
