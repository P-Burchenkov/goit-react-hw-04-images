import { createPortal } from 'react-dom';
import { Component } from 'react';
import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseModalEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseModalEsc);
  }

  onCloseModalEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onCloseModalBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.onCloseModalBackdrop}>
        <div className={css.Modal}>
          <img src={this.props.url} alt={this.props.tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
