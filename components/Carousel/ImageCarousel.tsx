import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

type ImageCarouselProps = {
  images: string[];
  height?: number;
  width?: number;
};

const ImageCarousel = ({ images, height = 400, width = 600 } : ImageCarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  //calculate the maximum image height of the images
  const maxHeight = height || 400;

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = images.map((image) => {
        const img = new Image();
        img.src = image;
        return new Promise((resolve) => {
          img.onload = () => resolve(image);
        });
      });
      setPreloadedImages(await Promise.all(imagePromises) as string[]);
    };

    preloadImages();
  }, [images]);

  const handleNextImage = () => {
    setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
  };

  return (
    <div className={"h-[400px] relative"}>
      <div className="overflow-hidden">
        {preloadedImages.map((image, index) => (
          <Transition
            key={index}
            show={index === currentImageIndex}
            enter="transition ease-out duration-300 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-300 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            className="absolute top-0 left-[25%] h-full w-full"
          >
            <img src={image} alt={`Image ${index}`} className={`h-${height} w-${width} object-cover`} />
          </Transition>
        ))}
      </div>

      <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
        <button
          className="bg-gray-800 text-white p-2 rounded-full"
          onClick={handlePreviousImage}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <button
          className="bg-gray-800 text-white p-2 rounded-full"
          onClick={handleNextImage}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
