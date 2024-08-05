import React from "react";
import "../css/ImageCard.css";

const ImageCard = ({ image, onClick }) => {
  return (
    <div className="image-card">
      <img
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => onClick(image)}
      />
    </div>
  );
};

export default ImageCard;
