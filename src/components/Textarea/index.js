import React from 'react';
//styles
import style from './Textarea.module.scss';

const Textarea = (props) => {
  const {
    id,
    name,
    type,
    onChange,
    value,
    placeholder,
    className,
    cols,
    rows,
  } = props;
  return (
    <textarea
      rows={rows}
      cols={cols}
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={`${style.root} ${className}`}
      placeholder={placeholder}
    />
  );
};

export default Textarea;
