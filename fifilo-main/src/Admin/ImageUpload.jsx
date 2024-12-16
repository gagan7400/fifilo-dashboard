import React, { useState, useRef } from "react";
import axios from "axios";

const ImageUpload = ({ setImageUplaoded }) => {
    const [altText, setAltText] = useState("");
    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            await handleUpload(files);
            e.target.value = ""; // Reset the file input
        }
    };

    const handleDivClick = () => {
        fileInputRef.current.click(); // Trigger file input click
    };

    const handleUpload = async (files) => {
        const formData = new FormData();
        for (let file of files) {
            formData.append("images", file);
        }
        formData.append("altText", altText);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/media/upload",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            setImageUplaoded(response.data.images);
            alert("Images uploaded successfully");
        } catch (error) {
            console.error("Error uploading images", error);
        }
    };

    return (
        <>
            <div className="edit__tools">
                <div className="upload__section">
                    <div className="upload__container" onClick={handleDivClick}>
                        <input
                            type="file"
                            multiple
                            id="fileInput"
                            ref={fileInputRef}
                            accept=".svg,.png,.jpg,.jpeg,.gif"
                            hidden={true}
                            onChange={handleFileChange}
                        />
                        <div className="upload__area" id="uploadArea">
                            <div className="upload__icon">
                                <img src="assets/imgs/upload-cloud.svg" alt="" />
                            </div>
                            <p><span>Click to upload</span></p>
                            <p>Only SVG, PNG, JPG</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImageUpload;

// import React, { useState, useRef } from "react";
// import axios from "axios";

// const ImageUpload = ({ imageUploaded, setImageUplaoded }) => {
//     const [file, setFile] = useState(null);
//     const [altText, setAltText] = useState("null");
//     const fileInputRef = useRef(null);

//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         if (selectedFile) {
//             setFile(selectedFile);
//             handleUpload(selectedFile);
//             e.target.value = ""; // Reset the file input value
//         }
//     };

//     const handleDivClick = () => {
//         fileInputRef.current.click(); // Trigger file input click
//     };

//     const handleUpload = async (im) => {
//         const formData = new FormData();
//         formData.append("image", im);
//         formData.append("altText", altText);
//         console.log(im);

//         if (im) {
//             try {
//                 const response = await axios.post("http://localhost:5000/api/media/upload", formData, {
//                     headers: { "Content-Type": "multipart/form-data" },
//                 });
//                 console.log(response);
//                 setFile(null);
//                 setImageUplaoded(response);
//                 alert("Image uploaded successfully");
//             } catch (error) {
//                 console.error("Error uploading image", error);
//             }
//         }
//     };

//     return (
//         <>
//             <div className="edit__tools">
//                 <div className="upload__section">
//                     <div className="upload__container" onClick={handleDivClick}>
//                         <input
//                             type="file"
//                             multiple
//                             id="fileInput"
//                             ref={fileInputRef}
//                             accept=".svg,.png,.jpg,.jpeg,.gif"
//                             hidden={true}
//                             onChange={handleFileChange}
//                         />
//                         <div className="upload__area" id="uploadArea">
//                             <div className="upload__icon">
//                                 <img src="assets/imgs/upload-cloud.svg" alt="" />
//                             </div>
//                             <p><span>Click to upload</span></p>
//                             <p>Only SVG, PNG, JPG</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ImageUpload;
