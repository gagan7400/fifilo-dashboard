import React, { useState, useRef, useEffect } from "react";
import MediaLibrary from "./MediaLibrary";
import ImageUpload from "./ImageUpload";


const MediaLibraryModal = ({ isOpen, onClose, onSelectImage }) => {
    const [section, setSection] = useState(false);
    const launchbtn = useRef();
    if (!isOpen) return null;
    return (
        <>
            <div className="modal mediaLibrary" style={{ backgroundColor: "rgb(0,0,0,0.5)", display: "block", position: "fixed", top: 0, left: 0, zIndex: 1000, width: "100%", height: "100%", }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Featured Image</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose} ></button>
                        </div>
                        <div className="modal-body">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="upload-file-tab" data-bs-toggle="tab" data-bs-target="#upload-file" type="button" role="tab" aria-controls="upload-file"
                                        aria-selected="true">Upload File</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link  active" id="media-tab" data-bs-toggle="tab" data-bs-target="#media" type="button" role="tab" aria-controls="media" aria-selected="false">Media
                                        Library</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade" id="upload-file" role="tabpanel" aria-labelledby="upload-file-tab">
                                    <ImageUpload/>
                                </div>
                                <div className="tab-pane fade  show active" id="media" role="tabpanel" aria-labelledby="media-tab">
                                    <div className="row gx-0">
                                        <div className="col-lg-9 col-md-9">
                                            <div className="attachments-wrapper">
                                                <MediaLibrary onSelectImage={onSelectImage} />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn__update">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MediaLibraryModal;
