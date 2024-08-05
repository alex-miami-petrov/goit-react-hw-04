import React from "react";
import Modal from "react-modal";

const ImageModal = ({ isOpen, onRequestClose, image }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick
      onRequestClose={() => {
        onRequestClose();
      }}
      ariaHideApp={false}
    >
      <button onClick={onRequestClose}>Close</button>
      <img src={image.urls.regular} alt={image.alt_description} />
    </Modal>
  );
};

export default ImageModal;
