import React from "react";

const ImageCard = ({ image, onClick }) => {
  return (
    <div>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => onClick(image)}
      />
    </div>
  );
};

export default ImageCard;
