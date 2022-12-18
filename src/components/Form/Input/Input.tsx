import { ErrorMessage, Field } from 'formik';
import React from 'react';
import s from './Input.module.scss';

interface InputProps {
  labelName: string;
  id: string;
  name: string;
  placeholder?: string;
  type?: string;
}

const Input = ({ labelName, id, name, placeholder, type = 'text' }: InputProps) => {
  return (
    <div className={s.container}>
      <label className={s.label} htmlFor={id}>
        {labelName}
      </label>
      <ErrorMessage component="div" name={name} className={s.error} />
      <Field className={s.input} id={id} name={name} type={type} placeholder={placeholder}></Field>
    </div>
  );
};

export default Input;
