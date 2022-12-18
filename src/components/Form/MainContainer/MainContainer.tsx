import { ReactNode } from 'react';
import s from './MainContainer.module.scss';

interface MainContainerProps {
  title: string;
  children: ReactNode;
  serverError?: string | null;
}

const MainContainer = ({ children, serverError, title }: MainContainerProps) => {
  return (
    <section className={s.dialog}>
      <h1 className={serverError ? s.serverError : s.title}>{serverError ? serverError : title}</h1>
      <div className={s.line}></div>
      {children}
    </section>
  );
};

export default MainContainer;
