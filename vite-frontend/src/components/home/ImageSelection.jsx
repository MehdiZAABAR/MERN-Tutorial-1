import React from 'react';

const imageDescriptions = [
  'Large Water Basins System',
  'Horizontal PVC Pipe System',
  // ... add descriptions for other images
];

const ImageSection = () => {
  return (
    <div className="image-section">
      {imageDescriptions.map((description, index) => (
        <div key={index} className="image-wrapper">
          <img
            src={`https://via.placeholder.com/300x200?text=${description}`} // Placeholder image
            alt={description}
          />
          <p className="image-description">{description}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageSection;