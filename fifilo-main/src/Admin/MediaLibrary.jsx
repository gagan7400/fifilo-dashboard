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
    <div>
      <h2>Media Library</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((image) => (
          <div key={image._id} style={{ margin: "10px", border: selectedImage === image ? "2px solid blue" : "none", }} >
            <img src={`http://localhost:5000/images/${image.filename}`} alt={image.altText} style={{ width: "100px", height: "100px", cursor: "pointer" }}
              onClick={() => handleImageClick(image)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaLibrary;
