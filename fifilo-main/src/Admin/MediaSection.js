import React, { useState } from "react";
import MediaLibrary from "./MediaLibrary";
import ImageUpload from "./ImageUpload";
import Sidebar from "./Sidebar";

const MediaSection = () => {
    const [section, setSection] = useState(false)


    return (
        <>
            <Sidebar />
            <div className="main__content" >
                <div class="page__editors">
                    <div class="page__title">
                        <h5>Media Library</h5>
                        <button class="btn btn__update" onClick={() => { setSection(!section) }}>{section ?<> <img src="assets/imgs/arrow-back.svg" />Back</> : "Add New Media File"}</button>
                    </div>

                    {section ? <ImageUpload /> : ""}
                    <div class="media__grids">
                        <MediaLibrary />
                    </div>


                </div>

                {/* <div >
                    <div style={{ backgroundColor: "#fff", width: "80vw", height: "80vh" }}>
                        <div>
                            <button className={`btn ${section ? "btn-primary" : ""} m-1`} type="button" onClick={() => { setSection(true) }}>Upload new image </button>
                            <button className={`btn ${!section ? "btn-primary" : ""} m-1`} type="button" onClick={() => { setSection(false) }}>Media library  </button>
                        </div>

                        {section ?
                            <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", width: "100%", maxHeight: "80%", overflowY: "auto", scrollbarWidth: "3px" }}>
                                <ImageUpload />
                            </div>
                            :
                            <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", width: "100%", maxHeight: "80%", overflowY: "auto", scrollbarWidth: "1px" }}>
                                <MediaLibrary />
                            </div>
                        }
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default MediaSection;
