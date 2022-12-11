import React from 'react';
import cn from 'classnames';
import s from './Button.module.scss';

interface IButton {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button = ({ type = 'button', onClick, children, className, disabled = false }: IButton) => {
  const style = cn(s.button, className, { [s.disabled]: disabled });
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={style}>
      {children}
    </button>
  );
};

export default Button;
