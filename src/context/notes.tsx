import React from 'react';
import { toast, TypeOptions } from 'react-toastify';
import { IToastAlert, INoteContext, INotes } from '@/interfaces';
import { api } from '@/services/api';
import { DefaultNote, DefaultToastAlert } from '@/utils/Lists';

const NoteContext = React.createContext<INoteContext>({
  syncNotes: [DefaultNote],
  addNote: () => { },
  removeNote: async () => { },
  createNote: async () => { },
  updateNote: async () => { },
});

const MovieContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [syncNotes, setSyncNotes] = React.useState<INotes[]>([]);
  const [toastAlert, setToastAlert] = React.useState<IToastAlert>(DefaultToastAlert);
  
  React.useEffect(() => {
    async function fetchNotes() {
      await api
        .get("notes")
        .then((result: any) => setSyncNotes([...result.data.data]))
        .catch((error: any) => console.log(error));
    }
    fetchNotes();
  }, []);

  const addNote = (note: INotes) => setSyncNotes([...syncNotes, note]);
  
  const ToastAlertError = (error: any) => {
    const message: string = error.message || error.response.data.message || 'Error';
    return setToastAlert({ show: true, message: message, type: 'error'});
  }
  const ToastAlert = (message: string) => setToastAlert({show: true, message: message, type: 'success'});

  const createNote = async (note: INotes) => {
    await api.post('notes', note).then((result: any) => {
      const { data, message }: { data: INotes, message: string } = result.data;

      let oldSyncNotes = [ ...syncNotes ];
      const oldNoteIndex = syncNotes.findIndex((annotation: INotes) => annotation.id === note.id);
      oldSyncNotes[oldNoteIndex] = { ...data };
      setSyncNotes(oldSyncNotes);

      ToastAlert(message);
    }).catch((error: any) => ToastAlertError(error));
  };

  const updateNote = async (note: INotes) => {
    await api.put(`note`, note)
      .then((result: any) => {
      const { message }: { data: INotes, message: string } = result.data;
      ToastAlert(message);
    })
    .catch((error: any) => ToastAlertError(error));
  };

  const removeNote = async (id: string) => {
    await api.delete(`note/${id}`)
    .then((response: any) => {
      const { message } = response.data;
        ToastAlert(message);
        setSyncNotes([...syncNotes.filter((item: INotes) => item.id !== id && item)]);
    }).catch((error: any) => ToastAlertError(error));
  }

  const notify = React.useCallback((type: TypeOptions, message: string) => toast(message, { 
    type,
    onClick: () => toast.dismiss(),
    onClose: () => setToastAlert(DefaultToastAlert)
  }), []);

  return (
    <NoteContext.Provider
      value={{
        syncNotes: syncNotes,
        addNote: addNote,
        removeNote: removeNote,
        createNote: createNote,
        updateNote: updateNote
      }}
    >
      {children}
      { toastAlert.show && notify(toastAlert.type, toastAlert.message) }
    </NoteContext.Provider>
  );
}

export { MovieContextProvider };
export default NoteContext;