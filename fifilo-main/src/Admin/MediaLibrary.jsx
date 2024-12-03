import React, { useState, useEffect } from "react";
import axios from "axios";

const MediaLibrary = ({ onSelectImage, imageUploaded, showModal, setShowModal, selectedImage, setSelectedImage }) => {
  const [images, setImages] = useState([]);
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
  }, [imageUploaded]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };



  return (
    <div>
      <ul>
        {images.map((image, index) => (
          <li key={index}>
            <div className="thumbnail" onClick={() => handleImageClick(image)} >
              <img src={`http://localhost:5000/images/${image.filename}`} alt={image.filename} />
            </div>
          </li>
        )).reverse()}
      </ul>
    </div>
  );
};

export default MediaLibrary;
