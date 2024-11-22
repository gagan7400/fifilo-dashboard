import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./adminstyle.css";
import Sidebar from "./Sidebar";

const TinyMCE = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("Draft");
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(false);

  const handleThumbnailUpload = (e) => {
    setThumbnail(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const caseStudyData = {
      title,
      description,
      content,
      tags: tags.split(",").map(tag => tag.trim()),
      status,
      thumbnail,
    };
    console.log("Case Study Data:", caseStudyData);
    setTitle("");
    setDescription("");
    setContent("");
    setTags("");
    setStatus("Draft");
    setThumbnail(null);
  };

  return (
    <>
      <Sidebar titles="Editor Section" />
      <div className="main__content">
        <div className="case-study-form">
          <h2>Create Case Study</h2>
          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <label>Content:</label>
            <Editor
              value={content}
              apiKey="jd3e97w8li70lbzue44vverzarnpb6y52c1aht6swqstquwz"
              init={{
                height: 400,
                menubar: true,
                plugins: [
                  "advlist", // Advanced list features
                  "lists", // Standard list functionality
                  "link", "image", "charmap", "preview", "anchor", // Optional additional features
                  "searchreplace", "visualblocks", "code", "fullscreen",
                  "insertdatetime", "media", "table", "paste", "help", "wordcount"
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor  | \ alignleft aligncenter alignright alignjustify | \ bullist numlist | removeformat | help",
              }}
              onEditorChange={(newContent) => setContent(newContent)}
            />
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <label>Tags (comma-separated):</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., Design, Development"
            />

            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>

            <label>Thumbnail:</label>
            <input type="file" onChange={handleThumbnailUpload} />
            {thumbnail && <img src={thumbnail} alt="Thumbnail Preview" className="thumbnail-preview" />}

            <button type="button" onClick={() => setPreview(true)} className="preview-button">
              Preview
            </button>
            <button type="submit">Save Case Study</button>
          </form>

          {preview && (
            <div className="preview-modal  w-50 p-5" style={{ marginLeft: "300px" }}>
              <div className="preview-content">
                <h3>{title}</h3>
                <p>{description}</p>
                {thumbnail && <img src={thumbnail} alt="Thumbnail Preview" className="img-thumbnail" />}
                <div dangerouslySetInnerHTML={{ __html: content }} />
                <button onClick={() => setPreview(false)} className="close-preview">Close Preview</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TinyMCE;
