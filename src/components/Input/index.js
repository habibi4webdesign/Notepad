import React from 'react';
//styles
import style from './Input.module.scss';

const Input = (props) => {
  const { id, name, type, onChange, value, placeholder, className } = props;
  return (
    <input
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

export default Input;
