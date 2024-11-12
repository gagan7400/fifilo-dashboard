import React, { useState } from 'react'
import MediaLibraryModal from "./MediaLibraryModal";

export default function ToolSection({ tool, index, handleTools }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Open the modal to select an image
    const openMediaLibrary = () => setIsModalOpen(true);

    // Close the modal
    const closeMediaLibrary = () => setIsModalOpen(false);

    // Handle image selection
    const handleImageSelect = (image) => {
        setSelectedImage(image); // Set the selected image data
        handleTools(index, { filename: image.filename, path: image.filePath })
        setIsModalOpen(false); // Close the modal
    };
    return (
        <div className="mb-3 p-2  " >
            <span className="form-label">Tool {index + 1} </span> <br />
            <div className="imgbx" style={{ height: "100px" }}>
                <img src={`http://localhost:5000/images/${tool.filename}`} alt="Avatar" className="image" />
                <div className="overlay" >
                    <i className="icon"><button type="button" className='btn btn-info' onClick={() => { openMediaLibrary() }}>&#9998;</button></i>
                </div>
            </div>
            <MediaLibraryModal
                isOpen={isModalOpen}
                onClose={closeMediaLibrary}
                onSelectImage={handleImageSelect} // Pass the image selection handler
            />
        </div>
    )
}
