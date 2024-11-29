import React, { useState, useEffect } from "react";
import axios from "axios";

const MediaLibrary = ({ onSelectImage, ImageUplaoded }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/media");
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };
    fetchImages();
  }, [ImageUplaoded]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    if (onSelectImage) {
      onSelectImage(image);
    }
  };

  return (
    <ul>
      {images.map((image, index) => (
        <li key={index}>
          <div className="thumbnail"><img src={`http://localhost:5000/images/${image.filename}`} alt="Image 1" onClick={() => handleImageClick(image)} /></div>
        </li>
      ))}
    </ul>
  );
};

export default MediaLibrary;
