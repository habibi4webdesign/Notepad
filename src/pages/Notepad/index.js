import React from 'react';
//domain components
import CreateNotepad from 'domains/Notepad/CreateNotepad';
//styles
import { root } from './Notepad.module.scss';
//UI components


const Notepad = () => {
  return (
    <div className={root}>
      <CreateNotepad />
      {/* <Notes />  */}
    </div>
  );
};

export default Notepad;
