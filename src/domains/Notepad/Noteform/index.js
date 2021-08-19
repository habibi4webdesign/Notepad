import React, { useState } from 'react';
//styles
import style from './Noteform.module.scss';
import { ErrorMessage, useField } from 'formik';
//UI components
import Button from 'components/Button';

const Noteform = (props) => {
  const { name = 'notes' } = props;
  const [noteTitle, setnoteTitle] = useState('');
  const [noteDescription, setnoteDescription] = useState('');
  const [, { value }, { setValue }] = useField(name);

  const onTitleChange = (e) => {
    setnoteTitle(e?.target?.value);
  };

  const onDescriptionChange = (e) => {
    setnoteDescription(e?.target?.value);
  };

  const addNote = () => {
    const note = {
      title: noteTitle,
      description: noteDescription,
    };

    setValue([...value, note]);
  };

  return (
    <div className={style.root}>
      <h1 className={style.header}>My Notes</h1>
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
      <Button className={style.btn} onClick={addNote} type="btnPrimary">
        Add
      </Button>

      <ErrorMessage name={name}>{(msg) => <div>{msg}</div>}</ErrorMessage>
    </div>
  );
};

export default Noteform;
