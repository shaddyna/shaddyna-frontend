import React from "react";

interface ProductImageGalleryProps {
  images: string[];
  selectedImage: string;
  onSelectImage: (img: string) => void;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  selectedImage,
  onSelectImage,
}) => (
  <div>
    <img
      src={selectedImage}
      alt="Main product"
      className="w-full h-80 object-cover rounded-lg shadow-md"
    />
    <div className="flex gap-2 mt-4">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Thumbnail ${idx}`}
          className={`w-16 h-16 cursor-pointer border-2 ${
            selectedImage === img ? "border-blue-500" : "border-gray-300"
          } rounded-lg object-cover`}
          onClick={() => onSelectImage(img)}
        />
      ))}
    </div>
  </div>
);