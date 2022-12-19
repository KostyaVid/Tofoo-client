import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector, useFetchAuth } from "../../hooks";
import cn from "classnames";
import Button from "../Button/Button";
import LinkLabel from "../LinkLabel/LinkLabel";
import Modal from "../Modal/Modal";
import s from "./Header.module.scss";
import NavLinkLabel from "../NavLinkLabel/NavLinkLabel";
import { logOut } from "../../store/slices/homeUserSlice";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useAppSelector((state) => state.screenSize.value);
  const dispatch = useAppDispatch();
  const fetchAuth = useFetchAuth();
  const [activeMenu, setActiveMenu] = useState(false);
  const { username, company_id } = useAppSelector(
    (state) => state.homeUser.homeUser
  );

  const handleClickMenu = useCallback(
    () => setActiveMenu((value) => !value),
    []
  );
  const handleClickCloseMenu = useCallback(() => setActiveMenu(false), []);
  const handleClickBack = useCallback(() => navigate(-1), [navigate]);
  const handleLogOut = async () => {
    try {
      const res = await fetchAuth("/api/logout");
      if (res.status === 200) {
        localStorage.removeItem("JWTToken");
        dispatch(logOut());
        navigate("/login");
      }
    } catch (err) {
      console.log("Error Logout");
    }
  };

  useEffect(() => {
    setActiveMenu(false);
  }, [location, isMobile]);

  return (
    <header className={"container"}>
      <div className={s.header}>
        <img src="img/logo.svg" alt="ToFoo" />
        {username && company_id && (
          <div className={s.links + " " + s.desktopMenu}>
            <NavLinkLabel href="/">Home</NavLinkLabel>
            <NavLinkLabel href="/company">Companies</NavLinkLabel>
            <NavLinkLabel href="/projects">Projects</NavLinkLabel>
            <NavLinkLabel href="/sprints">Sprints</NavLinkLabel>
            <NavLinkLabel href="/todos">ToDos</NavLinkLabel>
          </div>
        )}
        <div
          className={cn(s.containerBurger, { [s.burgerHidden]: activeMenu })}
        >
          <button
            onClick={handleClickBack}
            aria-label="back"
            data-testid="buttonBackHistory"
          >
            <svg
              className={s.svgBack}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M177.5 98c-8.8-3.8-19-2-26 4.6l-144 136C2.7 243.1 0 249.4 0 256s2.7 12.9 7.5 17.4l144 136c7 6.6 17.2 8.4 26 4.6s14.5-12.5 14.5-22l0-88 288 0c17.7 0 32-14.3 32-32l0-32c0-17.7-14.3-32-32-32l-288 0 0-88c0-9.6-5.7-18.2-14.5-22z" />
            </svg>
          </button>
          <button
            onClick={handleClickMenu}
            className={s.buttonBurger}
            aria-label="menu"
          >
            <svg
              className={s.svgBurger}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </button>
        </div>
      </div>
      <Modal
        modalPosition="right"
        isActive={activeMenu}
        handleClickOverlay={handleClickMenu}
      >
        <div className={s.links + " " + s.menu}>
          <button
            className={s.buttonClose}
            aria-label="close menu"
            onClick={handleClickCloseMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
            </svg>
          </button>
          {username && company_id && (
            <>
              {location.pathname !== "/" && (
                <LinkLabel href="/">Home</LinkLabel>
              )}
              {location.pathname !== "/company" && (
                <LinkLabel href="/company">Companies</LinkLabel>
              )}
              {location.pathname !== "/projects" && (
                <LinkLabel href="/projects">Projects</LinkLabel>
              )}
              {location.pathname !== "/sprints" && (
                <LinkLabel href="/sprints">Sprints</LinkLabel>
              )}
              {location.pathname !== "/todos" && (
                <LinkLabel href="/todos">ToDos</LinkLabel>
              )}
              <div className={s.line}></div>
            </>
          )}
          {username ? (
            <Button onClick={handleLogOut}>Logout</Button>
          ) : (
            <>
              <LinkLabel href="/login">Login</LinkLabel>
              <LinkLabel href="/signup">SignUp</LinkLabel>
            </>
          )}
        </div>
      </Modal>
    </header>
  );
};

export default React.memo(Header);
