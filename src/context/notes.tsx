import React from 'react';
import { toast, TypeOptions } from 'react-toastify';
import { INoteContext, INotes } from '@/interfaces';
import { api } from '@/services/api';
import { DefaultNote } from '@/utils/Lists';

const NoteContext = React.createContext<INoteContext>({
  syncNotes: [DefaultNote],
  addNote: () => {},
  removeNote: async () => {},
  createNote: async () => {},
  changeDone: () => {},
  clearCompletedTask: () => {},
});

const MovieContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [syncNotes, setSyncNotes] = React.useState<INotes[]>([]);

  const notify = React.useCallback(
    (type: TypeOptions, message: string) =>
      toast(message, {
        type,
        onClick: () => toast.dismiss(),
        autoClose: 2000,
      }),
    [],
  );

  React.useEffect(() => {
    async function fetchNotes(): Promise<void> {
      await api
        .get('notes')
        .then((result: any) => setSyncNotes([...result.data.data]))
        .catch((error: any) => console.log(error));
    }
    fetchNotes();
  }, []);

  const addNote = (note: INotes): void => setSyncNotes([...syncNotes, note]);

  const changeDone = (id: string): void => {
    let oldSyncNotes = [...syncNotes];
    const oldNoteIndex = syncNotes.findIndex((note: INotes) => note.id === id);
    if (oldNoteIndex != -1)
      oldSyncNotes[oldNoteIndex] = {
        ...oldSyncNotes[oldNoteIndex],
        done: !oldSyncNotes[oldNoteIndex].done,
      };
    setSyncNotes(oldSyncNotes);
  };

  const createNote = async (note: INotes): Promise<INotes | any> => {
    return await api({
      method: note.isActive ? 'put' : 'post',
      url: 'notes',
      data: note,
    })
      .then((result: any) => {
        const { data, message }: { data: INotes; message: string } =
          result.data;

        let oldSyncNotes = [...syncNotes];
        const oldNoteIndex = syncNotes.findIndex(
          (annotation: INotes) => annotation.id === note.id,
        );
        oldSyncNotes[oldNoteIndex] = { ...data };
        setSyncNotes(oldSyncNotes);

        notify('success', message);
        return data;
      })
      .catch((error: any) =>
        notify('error', error.response.data.message || error.message),
      );
  };

  const removeNote = async (id: string): Promise<any> => {
    return await api
      .delete(`note/${id}`)
      .then((response: any) => {
        notify('success', response.data.message);
        const noteIndex = syncNotes.findIndex((note) => note.id === id);
        const newSyncNotes = [...syncNotes.splice(noteIndex, 1)];
        setSyncNotes(newSyncNotes);
      })
      .catch((error: any) =>
        notify('error', error.response.data.message || error.message),
      );
  };

  const clearCompletedTask = async (): Promise<void> => {
    const newSyncNotes: INotes[] = [];

    await Promise.all(
      syncNotes.map(async (note: INotes) => {
        if (!note.done) return newSyncNotes.push(note);

        await api
          .delete(`note/${note.id}`)
          .then((response: any) => notify('success', response.data.message))
          .catch((error: any) =>
            notify('error', error.response.data.message || error.message),
          );
      }),
    );

    setSyncNotes(newSyncNotes);
  };

  return (
    <NoteContext.Provider
      value={{
        syncNotes: syncNotes,
        addNote: addNote,
        removeNote: removeNote,
        createNote: createNote,
        changeDone: changeDone,
        clearCompletedTask: clearCompletedTask,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export { MovieContextProvider };
export default NoteContext;
