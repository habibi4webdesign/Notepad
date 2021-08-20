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
  const { notepadState, getNotepad, createNotepad } = useGists();
  const [initialValues, setinitialValues] = useState({
    notepad: '',
    notes: [],
  });

  useEffect(() => {
    if (match?.params?.notepadId) {
      getNotepad(match.params.notepadId);
    }
  }, [match?.params?.notepadId]);

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

  const saveNotebook = (values, { resetForm }) => {
    createNotepad(values, history);
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
        onSubmit={saveNotebook}
        validationSchema={notbookSchema}
      >
        {({ handleSubmit, values }) => {
          return (
            <>
              <div className={style.fromWrapper}>
                <NotepadForm name="notepad" />
                <Notefrom noteIndex="add" hasHeader name="notes" />
                {values?.notes &&
                  values?.notes.map((noteform, index) => (
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
                <Button className={style.btn} type="btnDefault">
                  View Stats
                </Button>
                <Button
                  className={style.btn}
                  onClick={handleSubmit}
                  type="btnPrimary"
                >
                  Save
                </Button>
                <Button
                  className={style.btn}
                  type="btnSecondary"
                >
                  Delete
                </Button>
              </div>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default withRouter(CreateNotepad);
