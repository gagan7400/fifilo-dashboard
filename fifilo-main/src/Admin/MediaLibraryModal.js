import React, { useState } from "react";
import MediaLibrary from "./MediaLibrary";
import ImageUpload from "./ImageUpload";

const MediaLibraryModal = ({ isOpen, onClose, onSelectImage }) => {
    const [section, setSection] = useState(false)
    if (!isOpen) return null;

    return (
        <div style={{ backgroundColor: "#fff", position: "fixed", top: 0, left: 0, zIndex: 1000, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.7)", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <div style={{ backgroundColor: "#fff", width: "80vw", height: "80vh" }}>
                <button className="btn btn-danger" onClick={onClose} style={{ float: "right", fontSize: "16px" }}>X</button>
                <div>
                    <button className="btn btn-primary m-1" type="button" onClick={() => { setSection(true) }}>Upload new image </button>
                    <button className="btn btn-primary" type="button" onClick={() => { setSection(false) }}>Media library  </button>
                </div>

                {section ?
                    <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", width: "80%", maxHeight: "80%", overflowY: "auto" }}>
                        <ImageUpload />
                    </div>
                    :
                    <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", width: "80%", maxHeight: "80%", overflowY: "auto" }}>

                        <h2>Select an Image</h2>
                        <MediaLibrary onSelectImage={onSelectImage} />
                    </div>
                }
            </div>
        </div>

    );
};

export default MediaLibraryModal;
