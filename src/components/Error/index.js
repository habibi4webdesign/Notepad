import React from 'react';
//styles
import style from './Error.module.scss';

const Error = (props) => {
  const { children } = props;
  return <div className={style.error}>{children}</div>;
};

export default Error;
