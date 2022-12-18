import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import s from './NavLinkLabel.module.scss';

interface NavLinkLabelProps {
  children?: ReactNode;
  href: string;
}
const NavLinkLabel = ({ children, href }: NavLinkLabelProps) => {
  return (
    <NavLink className={({ isActive }) => cn(s.link, { [s.active]: isActive })} to={href}>
      {children}
    </NavLink>
  );
};

export default NavLinkLabel;
