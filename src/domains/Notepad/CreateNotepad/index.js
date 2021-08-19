import React from 'react';
import { Formik } from 'formik';

//domains components
import NotepadForm from 'domains/Notepad/NotepadForm';
import Notefrom from 'domains/Notepad/Noteform';
//hooks
import useGists from 'hooks/useGists';
//styles
import style from './CreateNotepad.module.scss';
//UI components
import Button from 'components/Button';

const CreateNotepad = () => {
  const { createGist } = useGists();

  const initialValues = {
    notepad: '',
    notes: [],
  };

  const onFormSubmit = (values, { resetForm }) => {
    debugger;
    createGist(values.notepad);
  };

  return (
    <div className={style.root}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onFormSubmit}
      >
        {({ handleSubmit, values, errors }) => {
          return (
            <>
              <div className={style.fromWrapper}>
                <NotepadForm name="notepad" />
                <Notefrom name="notes" />
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
                <Button className={style.btn} type="btnSecondary">
                  Delete
                </Button>
              </div>
              {/* list of notes */}
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateNotepad;
