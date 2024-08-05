import React from "react";
import ImageCard from "./ImageCard";
import "../css/ImageGallery.css";

const ImageGallery = ({ images, onImageClick }) => {
  if (images.length === 0) return null;

  return (
    <div className="gallery">
      {images.map((image) => (
        <div
          className="gallery-item"
          key={image.id}
          onClick={() => onImageClick(image)}
        >
          <ImageCard image={image} onClick={onImageClick} />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
