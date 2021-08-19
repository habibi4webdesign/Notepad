import React, { useState, useEffect } from 'react';
//styles
import style from './Noteform.module.scss';
import { ErrorMessage, useField } from 'formik';
//UI components
import Button from 'components/Button';

const Noteform = (props) => {
  const {
    name = 'notes',
    title,
    desc,
    hasHeader,
    isEditMode = false,
    noteIndex,
  } = props;
  const [noteTitle, setnoteTitle] = useState('');
  const [noteDescription, setnoteDescription] = useState('');
  const [, { value }, { setValue }] = useField(name);

  useEffect(() => {
    if (title || desc) {
      setnoteTitle(title);
      setnoteDescription(desc);
    }
  }, [title, desc]);

  const onTitleChange = (e) => {
    const inputVal = e?.target?.value;

    setnoteTitle(inputVal);

    if (isEditMode) {
      const tempValues = value;
      tempValues[noteIndex].title = inputVal;
      setValue([...tempValues]);
    }
  };

  const onDescriptionChange = (e) => {
    const inputVal = e?.target?.value;

    setnoteDescription(inputVal);

    if (isEditMode) {
      const tempValues = value;
      tempValues[noteIndex].desc = inputVal;
      setValue([...tempValues]);
    }
  };

  const addNote = () => {
    const note = {
      title: noteTitle,
      desc: noteDescription,
    };
    setnoteTitle('');
    setnoteDescription('');

    setValue([...value, note]);
  };

  const deleteNote = () => {
    setValue(value.filter((item, index) => index !== noteIndex));
  };

  return (
    <div className={`${style.root} ${isEditMode ? style.edit : style.add}`}>
      <div className={style.formWrapper}>
        {hasHeader && <h1 className={style.header}>My Notes</h1>}
        <input
          id="noteTitle"
          name="noteTitle"
          type="text"
          onChange={onTitleChange}
          value={noteTitle}
          placeholder="Enter note title..."
        />
        <textarea
          rows="4"
          cols="50"
          id="noteDescription"
          name="noteDescription"
          type="text"
          onChange={onDescriptionChange}
          value={noteDescription}
          placeholder="Enter note..."
        />
      </div>
      <div className={style.btnsWrapper}>
        {isEditMode ? (
          <Button
            className={`${style.btn} ${style.deleteBtn}`}
            onClick={deleteNote}
            type="btnPrimary"
          >
            delete
          </Button>
        ) : (
          <Button
            className={`${style.btn} ${style.addBtn}`}
            onClick={addNote}
            type="btnPrimary"
          >
            Add
          </Button>
        )}
      </div>

      <ErrorMessage name={name}>{(msg) => <div>{msg}</div>}</ErrorMessage>
    </div>
  );
};

export default Noteform;
