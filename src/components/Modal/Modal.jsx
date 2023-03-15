import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');
let scrollPosition = 0;

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    this.disableScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    this.enableScroll();
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.toggleModal();
    }
  };

  enableScroll = () => {
    document.body.style.cssText = '';
    window.scroll({ top: scrollPosition });
    document.documentElement.style.scrollBehavior = '';
  };

  disableScroll = () => {
    scrollPosition = window.scrollY;
    document.body.style.cssText = `
      position: fixed;
      top: -${scrollPosition}px;
      left: 0;
      height: 100vh;
      width: 100vw;
      padding-right: ${window.innerWidth - document.body.offsetWidth}px
    `;
    document.documentElement.style.scrollBehavior = 'unset';
  };

  render() {
    const { largeImageURL, tags } = this.props;

    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWindow src={largeImageURL} alt={tags} />
      </Overlay>,
      modalRoot
    );
  }
}

console.log(createPortal);
