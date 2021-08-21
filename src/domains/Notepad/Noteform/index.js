import React, { useState, useEffect } from 'react';
//styles
import style from './Noteform.module.scss';
import { useField } from 'formik';
//UI components
import Button from 'components/Button';
import Error from 'components/Error';
import Input from 'components/Input';
import Textarea from 'components/Textarea';


const MAX_TITLE_LENGTH = 255;
const MAX_DESC_LENGTH = 1000;

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
  const [, { value, error }, { setValue, setError }] = useField(name);

  useEffect(() => {
    if (title?.length) {
      setnoteTitle(title);
    }
    if (desc?.length) {
      setnoteDescription(desc);
    }
  }, [title, desc]);

  const onTitleChange = (e) => {
    const inputVal = e?.target?.value;

    if (inputVal.length > MAX_TITLE_LENGTH) {
      setError({
        [noteIndex]: `title length should be less than ${MAX_TITLE_LENGTH}`,
      });
      return;
    } else {
      setError({});
    }

    if (!inputVal.length) {
      setError({ [noteIndex]: 'note title and note description are required' });
    } else {
      setError({});
    }

    setnoteTitle(inputVal);

    if (isEditMode) {
      const tempValues = value;
      tempValues[noteIndex].title = inputVal;
      setValue([...tempValues]);
    }
  };

  const onDescriptionChange = (e) => {
    const inputVal = e?.target?.value;

    if (inputVal.length > MAX_DESC_LENGTH) {
      setError({
        [noteIndex]: `description length should be less than ${MAX_DESC_LENGTH}`,
      });
      return;
    } else {
      setError({});
    }

    if (!inputVal.length) {
      setError({ [noteIndex]: 'note title and note description are required' });
    } else {
      setError({});
    }

    setnoteDescription(inputVal);

    if (isEditMode) {
      const tempValues = value;
      tempValues[noteIndex].desc = inputVal;
      setValue([...tempValues]);
    }
  };

  const addNote = () => {
    if (noteTitle.length > MAX_TITLE_LENGTH) {
      setError({
        [noteIndex]: `title length should be less than ${MAX_TITLE_LENGTH}`,
      });
      return;
    } else {
      setError({});
    }

    if (noteDescription.length > MAX_DESC_LENGTH) {
      setError({
        [noteIndex]: `description length should be less than ${MAX_DESC_LENGTH}`,
      });
      return;
    } else {
      setError({});
    }

    if (!noteTitle.length || !noteDescription.length) {
      setError({ [noteIndex]: 'note title and note description are required' });
      return;
    } else {
      setError({});
    }

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
        <Input
          id="noteTitle"
          name="noteTitle"
          type="text"
          onChange={onTitleChange}
          value={noteTitle}
          placeholder="Enter note title..."
        />
        <Textarea
          rows="4"
          cols="50"
          id="noteDescription"
          name="noteDescription"
          type="text"
          onChange={onDescriptionChange}
          value={noteDescription}
          placeholder="Enter note..."
        />
        {error && (
          <Error>
            {Array.isArray(error)
              ? error.map((item) => {
                  return Object.keys(item)
                    .map((key) => item[key])
                    .join(' and ');
                })
              : error[noteIndex]}
          </Error>
        )}
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
    </div>
  );
};

export default Noteform;
