import { IconButtonProps } from "@mui/material/IconButton/IconButton";

export type InputsNotes = {
  id: string,
  name: string,
  notes?: string,
  dueDate?: string | Date,
  priority?: number | string
};

export interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export interface INotes {
  name: string;
  notes: string;
  dueDate: Date;
  priority: string | number;
}

export const priorityEnum = {
  10: "none",
  20: "low",
  30: "medium",
  40: "high"
}