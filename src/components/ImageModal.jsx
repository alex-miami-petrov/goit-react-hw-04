// import React from "react";
// import Modal from "react-modal";
// import PropTypes from "prop-types";
// import "../css/ImageModal.css";

// const ImageModal = ({ image, onClose }) => {
//   if (!image) return null;

//   return (
//     <Modal
//       isOpen={!!image}
//       onRequestClose={onClose}
//       contentLabel="Image Modal"
//       className="modal"
//       overlayClassName="overlay"
//     >
//       <button onClick={onClose} className="close-button">
//         Close
//       </button>
//       <img src={image.urls.regular} alt={image.alt_description} />
//     </Modal>
//   );
// };

// ImageModal.propTypes = {
//   image: PropTypes.object,
//   onClose: PropTypes.func.isRequired,
// };

// export default ImageModal;

import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import "../css/ImageModal.css";

// Встановлює кореневий елемент для доступності модального вікна
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
    >
      <button onClick={onClose} className="close-button">
        Close
      </button>
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
