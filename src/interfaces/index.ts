import { IconButtonProps } from '@mui/material/IconButton/IconButton';
import { TypeOptions } from 'react-toastify';

export interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export interface INotes {
  id?: string;
  isActive?: number;
  name: string;
  notes?: string;
  dueDate?: string | Date;
  priority?: string;
  updatedAt?: string;
  createdAt?: string;
  done?: boolean;
}

export type TypeNotes = {
  id: string;
  isActive?: number;
  name: string;
  notes?: string;
  dueDate?: string | Date;
  priority?: string;
  updatedAt?: string;
  createdAt?: string;
  done?: boolean;
};

export interface IToastAlert {
  show: boolean;
  message: string;
  type: TypeOptions;
}

export interface INoteContext {
  syncNotes: INotes[];
  addNote: (note: INotes) => void;
  createNote: (note: INotes) => Promise<INotes | any>;
  removeNote: (id: string) => void;
  changeDone: (id: string) => void;
  clearCompletedTask: () => void;
}
