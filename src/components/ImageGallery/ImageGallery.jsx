import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ images, onImageClick }) => {
  if (images.length === 0) return null;

  return (
    <div className={s.gallery}>
      {images.map((image) => (
        <div
          className={s.galleryItem}
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
