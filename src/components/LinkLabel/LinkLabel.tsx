import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import s from './LinkLabel.module.scss';

interface ILabel {
  children?: ReactNode;
  href: string;
}

const Label: FC<ILabel> = ({ children, href }) => {
  return (
    <Link className={s.link} to={href}>
      {children}
    </Link>
  );
};

export default Label;
