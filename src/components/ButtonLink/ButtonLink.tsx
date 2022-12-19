import React from "react";
import cn from "classnames";
import s from "./ButtonLink.module.scss";
import { Link } from "react-router-dom";

interface ButtonLinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  children,
  className,
}) => {
  const style = cn(s.buttonLink, className);
  return (
    <Link to={href} className={style}>
      {children}
    </Link>
  );
};

export default ButtonLink;
