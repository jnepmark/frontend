import React from 'react';

const ImageCard = ({ imageUrl }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt="uploaded" />
    </div>
  );
};

export default ImageCard;