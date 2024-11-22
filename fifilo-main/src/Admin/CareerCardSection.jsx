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
    let deleteImg = () => {
        handleCardChange(index, "cardImg", { filename: "", path: "" })

    }
    return (
        <div class="col-lg-12">
            <div class="profile__block">
                <div class="image__block">
                    <img src={card.cardImg.filename ? `http://localhost:4000/images/${card.cardImg.filename}` : "/assets/imgs/avatar.svg"} alt="" />
                </div>
                <div class="btn__grp">
                    <button class="btn" onClick={() => { openMediaLibrary() }}><img src="/assets/imgs/edit-05.svg" alt="" /></button>
                    <button class="btn" onClick={() => { deleteImg() }}><img src="/assets/imgs/trash-03.svg" alt="" /></button>
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
