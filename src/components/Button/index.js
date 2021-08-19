import React from 'react';
//styles
import style from './Button.module.scss';

const Button = (props) => {
  const { type, children, onClick, className } = props;
  return (
    <button
      onClick={onClick}
      className={`${style.btn} ${style[type]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
