import React from 'react';
//styles
import style from './NotepadForm.module.scss';
import { ErrorMessage, useField } from 'formik';

const NotepadForm = (props) => {
  const { name = 'notepad' } = props;
  const [, { value }, { setValue }] = useField(name);

  const onChange = (e) => {
    setValue(e?.target?.value);
  };

  return (
    <div className={style.root}>
      <label htmlFor={name}>Notepad Title</label>
      <input
        id={name}
        name={name}
        type="text"
        onChange={onChange}
        value={value}
        placeholder="My notepad title..."
      />
      <ErrorMessage name={name}>{(msg) => <div>{msg}</div>}</ErrorMessage>
    </div>
  );
};

export default NotepadForm;
