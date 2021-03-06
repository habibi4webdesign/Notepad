import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { Formik } from 'formik';
import * as yup from 'yup';
//domains components
import NotepadForm from 'domains/Notepad/NotepadForm';
import Notefrom from 'domains/Notepad/Noteform';
//hooks
import useGists from 'hooks/useGists';
//styles
import style from './CreateNotepad.module.scss';
//UI components
import Button from 'components/Button';

const MAX_TITLE_LENGTH = 255;

const CreateNotepad = ({ history, match }) => {
  const { notepadState, getNotepad, createNotepad, deleteNotepad } = useGists();
  const [initialValues, setinitialValues] = useState({
    notepad: '',
    notes: [],
  });

  useEffect(() => {
    if (match?.params?.notepadId) {
      getNotepad(match.params.notepadId);
    }
  }, [match?.params?.notepadId, getNotepad]);

  useEffect(() => {
    let normalizedNotes = [];
    const tempNotes = notepadState?.files;
    for (const key in tempNotes) {
      if (Object.hasOwnProperty.call(tempNotes, key)) {
        normalizedNotes.push({
          title: key,
          desc: tempNotes[key].content,
        });
      }
    }

    if (notepadState) {
      setinitialValues({
        notepad: notepadState.description,
        notes: normalizedNotes,
      });
    }
  }, [notepadState]);

  const saveNotepad = (values) => {
    createNotepad(values, history);
  };

  const deleteNotepadItem = () => {
    deleteNotepad(match?.params?.notepadId, history);
  };

  const notbookSchema = yup.object({
    notepad: yup
      .string()
      .required('required')
      .test(
        'len',
        `length should not be more than ${MAX_TITLE_LENGTH}`,
        (val) => val?.length <= MAX_TITLE_LENGTH,
      ),
    notes: yup.array().min(1, { add: 'at least one note is required' }),
  });

  return (
    <div className={style.root}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={saveNotepad}
        validationSchema={notbookSchema}
      >
        {({ handleSubmit, values }) => {
          return (
            <>
              <div className={style.fromWrapper}>
                <NotepadForm name="notepad" />
                <Notefrom noteIndex="add" hasHeader name="notes" />
                {values?.notes?.map((noteform, index) => (
                    <Notefrom
                      key={index}
                      noteIndex={index}
                      isEditMode
                      title={noteform.title}
                      desc={noteform.desc}
                      name="notes"
                    />
                  ))}
              </div>
              <div className={style.btnsWrapper}>
                <Button
                  onClick={() => history.push('/notepad/chart')}
                  className={style.btn}
                  type="btnDefault"
                >
                  View Stats
                </Button>
                <Button
                  className={style.btn}
                  onClick={handleSubmit}
                  type="btnPrimary"
                >
                  Save
                </Button>
                {match?.params?.notepadId && (
                  <Button
                    disabled={!values?.notes?.length}
                    onClick={deleteNotepadItem}
                    className={style.btn}
                    type="btnSecondary"
                  >
                    Delete
                  </Button>
                )}
              </div>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default withRouter(CreateNotepad);
