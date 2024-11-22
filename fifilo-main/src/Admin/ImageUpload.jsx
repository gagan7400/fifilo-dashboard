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
            const response = await axios.post("http://localhost:4000/api/media/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            // onUploadSuccess(response.data.image);
            setFile(null);
        } catch (error) {
            console.error("Error uploading image", error);
        }
    };

    return (
        <div style={{ width: "100%", height: "auto" }}>
            <div className="m-2">
                <label htmlFor="Img" className="form-label">Image Upload</label><br />
                <input type="file" name="Img" onChange={handleFileChange} />
            </div>
            <br />
            <div className="m-2">
                <label htmlFor="imgmedia" className="form-label">Alt text</label>  <br />
                <input type="text" className="form-input" id="imgmedia" value={altText} onChange={(e) => { setAltText(e.target.value) }}></input>
            </div>
            <button onClick={handleUpload} disabled={!file}>Upload</button>
        </div>
    );
};

export default ImageUpload;
