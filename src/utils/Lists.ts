import { INotes, IToastAlert } from "../interfaces";

export const DefaultNote: INotes = {
  id: '',
  name: '',
  isActive: 0,
  dueDate: new Date(Date.now()),
  notes: '',
  priority: 'none',
}

export const DefaultToastAlert: IToastAlert = { show: false, message: '', type: 'default' };
