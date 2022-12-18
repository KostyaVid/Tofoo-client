import React from 'react';
import cn from 'classnames';
import s from './Button.module.scss';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button = ({ type = 'button', onClick, children, className, disabled = false }: ButtonProps) => {
  const style = cn(s.button, className, { [s.disabled]: disabled });
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={style}>
      {children}
    </button>
  );
};

export default Button;
