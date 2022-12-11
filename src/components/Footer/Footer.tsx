import React from 'react';
import s from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={s.footer} data-testid="footer">
      <div className={'container ' + s.footer__container}>https://github.com/KostyaVid/tofoo</div>
    </footer>
  );
};

export default Footer;
