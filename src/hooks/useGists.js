import { useState } from 'react';
import API from 'utils/api';

const useGists = () => {
  const [notepadState, setnotepadState] = useState(null);
  const [notepadListState, setnotepadListState] = useState([]);

  const getNotepad = (notepadId) => {
    API.get(`/gists/${notepadId}`)
      .then((res) => {
        setnotepadState(res.data);
      })
      .catch(function (error) {
        //TODO handle errors
      });
  };

  const createNotepad = ({ notepad, notes }, history) => {
    const finalNotes = Object.fromEntries(
      notes.map((note) => {
        return [
          [note.title],
          {
            content: note.desc,
          },
        ];
      }),
    );

    API.post(`/gists`, {
      public: true,
      description: notepad,
      files: finalNotes,
    })
      .then((res) => {
        history.push(`/notepad/${res?.data?.id}`);
      })
      .catch(function (error) {
        //TODO handle errors
      });
  };

  const deleteNotepad = (notepadId, history) => {
    API.delete(`/gists/${notepadId}`)
      .then((res) => {
        if (res && res.status === 204) {
          history.push('/notepad');
        }
      })
      .catch(function (error) {
        //TODO handle errors
      });
  };

  const getNotepadList = (page) => {
    API.get(`/gists/public?page=${page}&per_page=8`)
      .then((res) => {
        setnotepadListState((preList) => [...preList, ...res.data]);
      })
      .catch(function (error) {
        //TODO handle errors
      });
  };

  return {
    notepadState,
    notepadListState,
    getNotepad,
    createNotepad,
    deleteNotepad,
    getNotepadList,
  };
};

export default useGists;
