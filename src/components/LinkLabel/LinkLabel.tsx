import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import s from './LinkLabel.module.scss';

interface ILabel {
  children?: ReactNode;
  href: string;
}

const Label = ({ children, href }: ILabel) => {
  return (
    <Link className={s.link} to={href}>
      {children}
    </Link>
  );
};

export default Label;
