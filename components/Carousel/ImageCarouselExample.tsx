import React from 'react';
import ImageCarousel from './ImageCarousel';

export const ImageCarouselExample: React.FC = () => {
  const images = [
    'https://picsum.photos/600/400',
    'https://picsum.photos/601/400',
    'https://picsum.photos/602/400',
    'https://picsum.photos/603/400',
    'https://picsum.photos/604/400',
  ];

  return (
    <div className="container mx-auto p-4">
      <ImageCarousel images={images} height={400} width={600} />
    </div>
  );
};
