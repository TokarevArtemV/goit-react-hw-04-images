import { useEffect } from 'react';

export const Modal = ({ imgSrc, imgAlt, onCloseModal, onChangeStatus }) => {
  const hendlerOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  useEffect(() => {
    const hendlerCloseModal = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', hendlerCloseModal);
    onChangeStatus('idle');

    return () => {
      window.removeEventListener('keydown', hendlerCloseModal);
    };
  }, [onCloseModal, onChangeStatus]);

  return (
    <div className="Overlay" onClick={hendlerOverlayClick}>
      <div className="Modal">
        <img src={imgSrc} alt={imgAlt} />
      </div>
    </div>
  );
};
