import React, { useState } from 'react'
import MediaLibraryModal from "./MediaLibraryModal";

export default function SketchesImg({ name, HandleSketchesImg, index, img }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Open the modal to select an image
    const openMediaLibrary = () => setIsModalOpen(true);

    // Close the modal
    const closeMediaLibrary = () => setIsModalOpen(false);

    // Handle image selection
    const handleImageSelect = (image) => {
        setSelectedImage(image); // Set the selected image data
        HandleSketchesImg(index, name, { filename: image.filename, path: image.filePath })
        setIsModalOpen(false); // Close the modal
    };
    let deleteImg = () => {
        HandleSketchesImg(index, name, { filename: "", path: "" })
    }
    return (
        <div className="col-lg-12">
             <div className="profile__block">
                <div className="image__block">
                    <img src={img && img.filename ? `http://localhost:5000/images/${img.filename}` : "assets/imgs/avatar.svg"} alt="" />
                </div>
                <div className="btn__grp">
                    <button className="btn" onClick={() => { openMediaLibrary() }}><img src="assets/imgs/edit-05.svg" alt="" /></button>
                    <button className="btn" onClick={() => { deleteImg() }}><img src="assets/imgs/trash-03.svg" alt="" /></button>
                </div>
            </div>
            <MediaLibraryModal
                isOpen={isModalOpen}
                onClose={closeMediaLibrary}
                onSelectImage={handleImageSelect}
            />
        </div>
    )
}
