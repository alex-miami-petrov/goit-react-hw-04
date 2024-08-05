import React from "react";
import ImageCard from "./ImageCard";
import "../css/ImageGallery.css";

const ImageGallery = ({ images }) => {
  if (images.length === 0) return null;

  return (
    <div className="gallery">
      {images.map((image) => (
        <div className="gallery-item" key={image.id}>
          <ImageCard image={image} />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
