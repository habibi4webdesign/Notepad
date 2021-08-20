import React from 'react';
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

const CreateNotepad = () => {
  const { createGist } = useGists();

  const initialValues = {
    notepad: '',
    notes: [],
  };

  const onFormSubmit = (values, { resetForm }) => {
    createGist(values.notepad);
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
        onSubmit={onFormSubmit}
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
                <Button className={style.btn} type="btnSecondary">
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

export default CreateNotepad;
