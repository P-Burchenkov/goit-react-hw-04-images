import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ url, tags, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', onCloseModalEsc);
    return () => {
      window.removeEventListener('keydown', onCloseModalEsc);
    };
  });

  const onCloseModalEsc = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const onCloseModalBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={onCloseModalBackdrop}>
      <div className={css.Modal}>
        <img src={url} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
}
