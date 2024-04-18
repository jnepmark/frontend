import React from 'react';

const ImageCard = ({ imageUrl }) => {
  return (
    <div className="card">
      {imageUrl ? (
           <img src={require(`${imageUrl}`)} alt="uploaded" />
      ): (
        <p>No image available</p>
      )}
    </div>
  );
};

export default ImageCard;