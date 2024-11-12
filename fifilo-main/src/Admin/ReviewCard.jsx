import React, { useState } from 'react'
import MediaLibraryModal from "./MediaLibraryModal";
export default function ReviewCard({ card, index, handleReviewCardChange }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Open the modal to select an image
    const openMediaLibrary = () => setIsModalOpen(true);

    // Close the modal
    const closeMediaLibrary = () => setIsModalOpen(false);

    // Handle image selection
    const handleImageSelect = (image) => {
        setSelectedImage(image); // Set the selected image data
        handleReviewCardChange(index, "clientImgs", { filename: image.filename, path: image.filePath })
        setIsModalOpen(false); // Close the modal
    };

    return (
        <div>
            <h5>Review  {index + 1}</h5>
            <div className="row">
                <div className="col">
                    <label htmlFor={`clientName${index}`} className="form-label">Reviewer Name </label>
                    <input type="text"
                        name="clientName"
                        id={`clientName${index}`}
                        className="form-control"
                        value={card.clientName}
                        onChange={(e) => { handleReviewCardChange(index, e) }}
                        placeholder="clientName"
                        autoComplete='false'
                    />
                </div>
                <div className="col">
                    <label htmlFor={`company${index}`} className="form-label"> Reviewer's Company </label>
                    <input type="text"
                        name="company"
                        id={`company${index}`}
                        className="form-control"
                        value={card.company}
                        onChange={(e) => { handleReviewCardChange(index, e) }}
                        placeholder="company"
                        autoComplete='false'
                    />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor={`Reviewdescription${index}`} className="form-label"> Review Description </label>
                <textarea
                    name="description"
                    id={`Reviewdescription${index}`}
                    className="form-control"
                    value={card.description}
                    onChange={(e) => { handleReviewCardChange(index, e) }}
                    rows={4}
                    placeholder="description"
                    autoComplete='false'
                > </textarea>
            </div>
            <div className="mb-3">
                <span className="form-label">clientImgs </span> <br />
                <div className="imgbx"  >
                    <img src={`http://localhost:5000/images/${card.clientImgs.filename}`} alt="Avatar" className="image" />
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
        </div>
    )
}
