import React from 'react';

const ImageCard = ({ imageUrl }) => {
  return (
    <div>
      <img src={imageUrl} alt="cat" style={{ width: '200px', height: '200px' }} />
    </div>
  );
}

export default ImageCard;