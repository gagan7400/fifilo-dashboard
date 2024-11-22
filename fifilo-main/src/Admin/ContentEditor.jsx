import React, { useState } from "react";
import MediaLibrary from "./MediaLibrary";
import ImageUpload from "./ImageUpload";

const ContentEditor = () => {
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const [ImageUplaoded, setImageUplaoded] = useState(null);
    const [section, setSection] = useState(null);

    const handleImageSelect = (imageUrl) => {
        setSelectedImageUrl(imageUrl);
    };

    const handleUploadSuccess = (newImage) => {
        console.log("Image uploaded:", newImage);
        setImageUplaoded(newImage)
    };

    return (
        <div>
            <button className="btn btn-parimary" onClick={() => { setSection(true) }}> Upload new image </button>  | <button className="btn btn-parimary" onClick={() => { setSection(false) }}>Media library </button>
           
            {selectedImageUrl && (
                <div>
                    <p>Selected Image:</p>
                    <img src={`http://localhost:4000/images/${selectedImageUrl.filename}`} alt="Selected" width="200" />
                </div>
            )}
            {section ?
                <ImageUpload onUploadSuccess={handleUploadSuccess} />
                :
                <MediaLibrary onSelectImage={handleImageSelect} ImageUplaoded={ImageUplaoded} />
            }
        </div>
    );
};

export default ContentEditor;
