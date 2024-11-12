import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
    const [file, setFile] = useState(null);
    const [altText, setAltText] = useState("null");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("altText", altText);

        try {
            const response = await axios.post("http://localhost:5000/api/media/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            // onUploadSuccess(response.data.image);
            setFile(null);
        } catch (error) {
            console.error("Error uploading image", error);
        }
    };

    return (
        <div style={{ width: "400px", height: "400px" }}>
            <input type="file" onChange={handleFileChange} />
            <label htmlFor="imgmedia"> Alt text for the image</label>
            <input type="text" id="imgmedia" value={altText} onChange={(e) => { setAltText(e.target.value) }}></input>
            <button onClick={handleUpload} disabled={!file}>Upload</button>
        </div>
    );
};

export default ImageUpload;
