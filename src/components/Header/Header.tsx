import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import LinkLabel from '../LinkLabel/LinkLabel';
import s from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  const { username, company_id } = useAppSelector((state) => state.homeUser);
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <header className={'container'}>
      <div className={s.header}>
        <img src="img/logo.svg" alt="ToFoo" />
        {username && company_id && (
          <div className={s.links}>
            <LinkLabel href="/">Home</LinkLabel>
            <LinkLabel href="/company">Companies</LinkLabel>
            <LinkLabel href="/projects">Projects</LinkLabel>
            <LinkLabel href="/sprints">Sprints</LinkLabel>
            <LinkLabel href="/todos">ToDos</LinkLabel>
          </div>
        )}
        <div className={s.containerBurger}>
          <button onClick={handleClick}>
            <svg className={s.svgBack} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M177.5 98c-8.8-3.8-19-2-26 4.6l-144 136C2.7 243.1 0 249.4 0 256s2.7 12.9 7.5 17.4l144 136c7 6.6 17.2 8.4 26 4.6s14.5-12.5 14.5-22l0-88 288 0c17.7 0 32-14.3 32-32l0-32c0-17.7-14.3-32-32-32l-288 0 0-88c0-9.6-5.7-18.2-14.5-22z" />
            </svg>
          </button>
          <button className={s.buttonBurger}>
            <svg className={s.svgBurger} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
