import React, {
  CSSProperties,
  FC,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import s from './Modal.module.scss';

interface IModal {
  children: ReactNode;
  isActive: boolean;
  modalPosition?: 'right' | 'top' | 'center' | 'left' | 'bottom';
  handleClickOverlay?: () => void;
  hideMode?: boolean;
}
const Modal: FC<IModal> = ({
  children,
  modalPosition = 'center',
  handleClickOverlay,
  isActive,
}) => {
  const [modalActive, setModalActive] = useState(isActive);
  const styleOverlay = cn(s.overlay, s[modalPosition]);
  const nodeRef = useRef(null);

  const duration = 300;
  const defaultStyle: CSSProperties = {
    transition: `all ${duration}ms ease-in-out`,
    left: '100vw',
  };
  const transitionStyles: Record<TransitionStatus, CSSProperties> = {
    entering: { left: '0' },
    entered: { left: '0' },
    exiting: { left: '100vw' },
    exited: { left: '100vw' },
    unmounted: {},
  };

  const handleClickOverlayOwn = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as Node).contains(event.currentTarget)) {
      setModalActive((value) => !value);
      if (handleClickOverlay) handleClickOverlay();
    }
  };

  useEffect(() => {
    setModalActive(isActive);
  }, [isActive]);

  return ReactDOM.createPortal(
    <Transition nodeRef={nodeRef} in={modalActive} timeout={duration} unmountOnExit={true}>
      {(state) => (
        <div
          ref={nodeRef}
          style={{ ...defaultStyle, ...transitionStyles[state] }}
          className={styleOverlay}
          onClick={handleClickOverlayOwn}
          aria-hidden={!modalActive}>
          {children}
        </div>
      )}
    </Transition>,
    document.body,
  );
};

export default React.memo(Modal);
