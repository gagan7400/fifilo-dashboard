import React, { useState, useRef } from "react";
import axios from "axios";

const ImageUpload = ({ setImageUplaoded, selectedImage, setSelectedImage, openmedi }) => {
  const [altText, setAltText] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      if (files.length > 10) {
        alert("length exceeded; Only 10 Images at a time");
      } else {
        setLoading(true); // Start loading when upload starts
        await handleUpload(files);
        e.target.value = ""; // Reset the file input
      }
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
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setImageUplaoded(response.data.images);
      console.log(response.data.images)

      // alert("Images uploaded successfully");
    } catch (error) {
      console.error("Error uploading images", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        openmedi();
      }, 1000);
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
              <>
                <div className="upload__icon">
                  <img src="assets/imgs/upload-cloud.svg" alt="" />
                </div>
                <p><span>Click to upload</span></p>
                <p>Only SVG, PNG, JPG (Max 10 Images)</p>
                {true &&
                  <div class="hacker-loader">
                    <div class="loader-bar">
                      <div class="bar-fill" id="barFill"></div>
                    </div>
                  </div>}
              </>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`/* From Uiverse.io by jeremyssocial */ 
 .hacker-loader {
            width: 100%;
            max-width: 800px;
            margin-top: 24px;
        }

        .loader-bar {
            width: 100%;
            height: 20px;
            background-color: #003300;
            border-radius: 8px;
            position: relative;
            overflow: hidden;
        }

        .bar-fill {
            width: 0%;
            height: 100%;
            background-color: #00ff00;
            text-align: center;
            line-height: 20px;
            font-weight: bold;
            color: black;
            position: absolute;
            left: 0;
            top: 0;
        }

        .percentage-text {
            position: absolute;
            width: 100%;
            text-align: center;
            font-size: 14px;
            color: white;
            font-weight: bold;
            z-index: 1;
        }
`}
      </style>
    </>
  );
};

export default ImageUpload;