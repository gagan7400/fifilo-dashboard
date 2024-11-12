import React, { useState } from 'react'
import MediaLibraryModal from "./MediaLibraryModal";

export default function CareerCardSection({ card, index, handleCardChange }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Open the modal to select an image
    const openMediaLibrary = () => setIsModalOpen(true);

    // Close the modal
    const closeMediaLibrary = () => setIsModalOpen(false);

    // Handle image selection
    const handleImageSelect = (image) => {
        setSelectedImage(image); // Set the selected image data
        handleCardChange(index, "cardImg", { filename: image.filename, path: image.filePath })
        setIsModalOpen(false); // Close the modal
    };
    return (
        <div className="mb-3" style={{ height: "150px", width: "100px" }}>
            <span className="form-label">cardImg </span> <br />
            <div className="imgbx"  >
                <img src={`http://localhost:5000/images/${card.cardImg.filename}`} alt="Avatar" className="image" />
                <div className="overlay" >
                    <i className="icon"><button type="button" className='btn btn-info' onClick={() => { openMediaLibrary() }}>&#9998;</button></i>
                </div>
            </div>

            {/* <img src={`http://localhost:5000/images/${card.cardImg.filename}`} width="50" /> */}
            <MediaLibraryModal
                isOpen={isModalOpen}
                onClose={closeMediaLibrary}
                onSelectImage={handleImageSelect} // Pass the image selection handler
            />
        </div>
    )
}
