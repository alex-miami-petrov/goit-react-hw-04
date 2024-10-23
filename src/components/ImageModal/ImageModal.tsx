import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import "./ImageModal.css";

Modal.setAppElement("#root");

const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className="modal"
      overlayClassName="overlay"
      ariaHideApp={true}
      shouldCloseOnOverlayClick={true}
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description}
        className="modal-image"
      />
    </Modal>
  );
};

ImageModal.propTypes = {
  image: PropTypes.shape({
    urls: PropTypes.shape({
      regular: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
