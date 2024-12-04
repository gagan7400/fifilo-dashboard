import React, { useState, useRef } from "react";
import MediaLibrary from "./MediaLibrary";
import ImageUpload from "./ImageUpload";
import Sidebar from "./Sidebar";
import axios from "axios";
const MediaSection = () => {
    const [section, setSection] = useState(false)
    const [imageUploaded, setImageUplaoded] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const inputRef = useRef(null);
    const handleDelete = async (imageId) => {
        if (window.confirm("Are You Sure,You Want Delete This")) {
            try {
                let { data } = await axios.delete(`http://localhost:5000/api/media/${imageId}`);
                if (data.success) {
                    setShowModal(false);
                    setImageUplaoded("deleted");
                } else {
                    console.log(data);
                }
            } catch (error) {
                console.error("Error deleting image", error);
            }
        }
    };
    const handleCopy = () => {
        if (inputRef.current) {
            // Select the text
            inputRef.current.select();
            inputRef.current.setSelectionRange(0, 99999); // For mobile compatibility

            // Copy the text to the clipboard
            navigator.clipboard.writeText(inputRef.current.value)
                .then(() => {
                    // alert("Text copied to clipboard!");
                })
                .catch((err) => {
                    console.error("Failed to copy text: ", err);
                });
        }
    };
    const closeModal = () => {
        setShowModal(false);
        setSelectedImage(null);
    };
    return (
        <>
            <Sidebar />
            <div className="main__content" >
                <div className="page__editors">
                    <div className="page__title">
                        <h5>Media Library</h5>
                        <button className="btn btn__update" onClick={() => { setSection(!section) }}>{section ? <> <img src="assets/imgs/arrow-back.svg" />Back</> : "Add New Media File"}</button>
                    </div>

                    {section ? <ImageUpload imageUploaded={imageUploaded} setImageUplaoded={setImageUplaoded} /> : ""}
                    <div className="media__grids">
                        <MediaLibrary
                            imageUploaded={imageUploaded}
                            showModal={showModal}
                            setShowModal={setShowModal}
                            selectedImage={selectedImage}
                            setSelectedImage={setSelectedImage} />
                    </div>
                </div>
                {showModal && selectedImage && (
                    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.6)", display: "flex", justifyContent: "center", alignItems: "center", }}>
                       <div  style={{   width: "50%", height: "50%",padding:"20px" , backgroundColor: "#fff"  }}>
                      <h3>Attachment  Details</h3>
                        <img style={{ width: "100px" }} src={`http://localhost:5000/images/${selectedImage.filename}`} alt={selectedImage.filename} />
                        <h6>{selectedImage.filename}</h6>
                        <p>{selectedImage.size ? selectedImage.size : 100} KB</p>
                        <p>{new Date(selectedImage.createdAt).toDateString()} </p>
                        <button className="btn" onClick={() => handleDelete(selectedImage._id)} >
                            Delete Permanently
                        </button>
                        <p> <input ref={inputRef} value={`http://localhost:5000/images/${selectedImage.filename}`} /> </p>
                        <button onClick={handleCopy}>Clip to clipboard </button>
                   </div>    </div>
                )}
            </div>
        </>
    );
};

export default MediaSection;
