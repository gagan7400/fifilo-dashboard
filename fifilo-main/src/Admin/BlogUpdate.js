import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import SeoImg from './SeoImg';
import JoditEditor from 'jodit-react';
import Blogimg from './Blogimg';
import Loader from '../layout/Loader';

const BlogUpdate = () => {
    let { name } = useParams()
    const editor = useRef(null);
    const [blog, setBlog] = useState("")
    const [bannerImg, setBannerImg] = useState({ filename: "", path: "" })
    const [blogTitle, setBlogTitle] = useState("")
    const [heading, setHeading] = useState("")
    const [blogUrl, setBlogUrl] = useState("")
    const [uploadedBy, setUploadedBy] = useState("")
    const [approxTime, setApproxTime] = useState("")
    const [blogCategory, setBlogCategory] = useState("")
    const [blogContent, setBlogContent] = useState("")
    const [tableOfContent, setTableOfContent] = useState([{ heading: "", id: "" }])
    const [loading, setLoading] = useState(true)
    const [seoSection, setSeoSection] = useState({
        title: "",
        keywords: "",
        description: "",
        seoImg: { filename: "", path: "" },
    });
    const addTableContent = () => {
        setTableOfContent([...tableOfContent, { heading: "", id: "" }])
    }
    const removeTablecontent = (index) => {
        let data = tableOfContent;
        setTableOfContent(data.filter((a, i) => i != index))
    }
    const handleTableContent = (index, event) => {
        let newvalue = tableOfContent
        newvalue[index][event.target.name] = event.target.value;
        setTableOfContent([...newvalue]);
    }

    useEffect(() => {
        const getCasestudy = async () => {
            try {
                let { data } = await axios.get(`http://localhost:5000/admin/blogs/getblog/${name.toLowerCase()}/`);
                if (data.success) {
                    setBlog(data.data)
                    setBannerImg(data.data.bannerImg);
                    setBlogTitle(data.data.blogTitle);
                    setBlogUrl(data.data.blogUrl);
                    setHeading(data.data.heading);
                    setUploadedBy(data.data.uploadedBy);
                    setApproxTime(data.data.approxTime);
                    setBlogCategory(data.data.blogCategory);
                    setBlogContent(data.data.blogContent);
                    setTableOfContent(data.data.tableOfContent);
                    setSeoSection({ ...data.data.seoSection });
                    setLoading(false)
                } else {
                    alert("Error occurred p");
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
            }
        };

        getCasestudy();
    }, [name]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let { data } = await axios.put('http://localhost:5000/admin/blogs/updateblog/' + blog._id, { tableOfContent, heading, uploadedBy, approxTime, bannerImg, blogTitle, seoSection, blogContent, blogCategory, blogUrl }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (data.success) {
                alert("Updated Succesfully")
            } else {
                alert("Error Occured");
            }
        } catch (error) {
            alert("Error Occured");
        }

    };


    return (
        <>
            <Sidebar />
            <div className="main__content" >
                {loading && <Loader />}
                <div className="page__editors">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><NavLink to="/blogadmin">Blogs</NavLink></li>
                            <li className="breadcrumb-item"><img src="assets/imgs/chevron-right.svg" alt="" /></li>
                            <li className="breadcrumb-item active">Blog</li>
                        </ol>
                    </nav>
                    <div className="page__title">
                        <h5>{blog.blogTitle}</h5>
                    </div>
                    <div className="page__editContent">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-hero-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-hero" type="button" role="tab" aria-controls="pills-hero"
                                    aria-selected="true">Hero</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-content-tab" data-bs-toggle="pill" data-bs-target="#pills-content"
                                    type="button" role="tab" aria-controls="pills-content" aria-selected="false">Blog Content</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-seo-tab" data-bs-toggle="pill" data-bs-target="#pills-seo"
                                    type="button" role="tab" aria-controls="pills-seo" aria-selected="false">SEO</button>
                            </li>

                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-hero" role="tabpanel"
                                aria-labelledby="pills-hero-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-6 ">
                                                <div className="input__inr">
                                                    <label htmlFor="blogTitle">Blog Title</label>
                                                    <input required type="text"
                                                        name="blogTitle"
                                                        id="blogTitle"
                                                        className="form-control"
                                                        value={blogTitle}
                                                        onChange={(e) => {
                                                            const title = e.target.value;
                                                            setBlogTitle(title);
                                                            setBlogUrl(title.toLowerCase().replace(/\s+/g, "-"));
                                                        }}
                                                        placeholder="Enter Blog Title"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 ">
                                                <div className="input__inr">
                                                    <label htmlFor="blogUrl">Blog Url</label>
                                                    <input required type="text"
                                                        name="blogUrl"
                                                        id="blogUrl"
                                                        className="form-control"
                                                        value={blogUrl}
                                                        onChange={(e) => setBlogUrl(e.target.value)}
                                                        placeholder="Enter Blog Url"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 ">
                                                <div className="input__inr">
                                                    <label htmlFor="uploadedBy">Uploaded By</label>
                                                    <input required type="text"
                                                        name="uploadedBy"
                                                        id="uploadedBy"
                                                        className="form-control"
                                                        value={uploadedBy}
                                                        onChange={(e) => setUploadedBy(e.target.value)}
                                                        placeholder="Enter Uploaded By"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 ">
                                                <div className="input__inr">
                                                    <label htmlFor="approxTime">Approximate Time</label>
                                                    <input required type="text"
                                                        name="approxTime"
                                                        id="approxTime"
                                                        className="form-control"
                                                        value={approxTime}
                                                        onChange={(e) => setApproxTime(e.target.value)}
                                                        placeholder="Enter Approx Time"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="input__inr">
                                                    <label htmlFor="approxTime">Heading</label>
                                                    <input required type="text"
                                                        name="Heading"
                                                        id="Heading"
                                                        className="form-control"
                                                        value={heading}
                                                        onChange={(e) => setHeading(e.target.value)}
                                                        placeholder="Enter Heading"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="input__inr">
                                                    <label htmlFor="blogCategory">Blog Category</label>
                                                    <select className="form-select form-select-sm mb-3" value={blogCategory} onChange={(e) => { setBlogCategory(e.target.value) }} aria-label="Small select example" id="blogcategory">
                                                        <option defaultValue="Design">Design</option>
                                                        <option value="Development">Development</option>
                                                        <option value="Sales">Sales</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <Blogimg setBannerImg={setBannerImg} bannerImg={bannerImg} />
                                        </div>
                                        <div className="update__block">
                                            <NavLink className="btn btn__cancel" to="/blogadmin">Cancel</NavLink>
                                            <button className="btn btn__update" type="button" onClick={handleSubmit}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-content" role="tabpanel" aria-labelledby="pills-content-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="testimonial__box">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="seo__card">
                                                        {tableOfContent?.length && tableOfContent.map((v, index) => (
                                                            <div className="card__block" key={index} >
                                                                <div className="testimonial__box">
                                                                    <div className="top__heading">
                                                                        <p>Heading {index + 1}</p>
                                                                        <button type="button" className="btn" onClick={() => removeTablecontent(index)}><img src="assets/imgs/trash.svg" alt="" />Delete</button>
                                                                    </div>
                                                                    <div className='row'>
                                                                        <div className="col-lg-6 col-md-6">
                                                                            <div className="input__inr">
                                                                                <label htmlFor="heading">Table Content heading  </label>
                                                                                <input required type="text"
                                                                                    name="heading"
                                                                                    id="heading"
                                                                                    className="form-control"
                                                                                    value={v.heading}
                                                                                    onChange={(e) => handleTableContent(index, e)}
                                                                                    placeholder="Enter Heading"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6">
                                                                            <div className="input__inr">
                                                                                <label htmlFor="id">Table Content ID  </label>
                                                                                <input required type="text"
                                                                                    name="id"
                                                                                    id="id"
                                                                                    className="form-control"
                                                                                    value={v.id}
                                                                                    onChange={(e) => handleTableContent(index, e)}
                                                                                    placeholder="Enter Content ID"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="add__review">
                                                            <button className="btn" type="button" onClick={addTableContent}><img src="assets/imgs/plus.svg" alt="" />Add More Table Content</button>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="BlogContent">Blog Content</label>
                                                        <JoditEditor
                                                            ref={editor}
                                                            value={blogContent}
                                                            onChange={(newContent) => setBlogContent(newContent)} // Save content on every keystroke
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="update__block">
                                                <NavLink className="btn btn__cancel" to="/blogadmin">Cancel</NavLink>
                                                <button className="btn btn__update" type="button" onClick={handleSubmit}>Update</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-seo" role="tabpanel" aria-labelledby="pills-seo-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="seotitle">Meta Title</label>
                                                    <input required
                                                        type="text"
                                                        name="seotitle"
                                                        id="seotitle"
                                                        value={seoSection.title}
                                                        onChange={(e) => setSeoSection({ ...seoSection, title: e.target.value })}
                                                        placeholder="Enter Meta Title"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="seo__card">
                                                    <div className="card__block">
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="input__inr">
                                                                    <label htmlFor="keywords">Keywords</label>
                                                                    <input type="text" id="keywords" className="form-control"
                                                                        value={seoSection.keywords}
                                                                        onChange={(e) => setSeoSection({ ...seoSection, keywords: e.target.value })}
                                                                        placeholder="Enter Keywords" />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="input__inr">
                                                                    <label htmlFor="Description">Meta Description</label>
                                                                    <textarea rows="4" className="form-control"
                                                                        value={seoSection.description}
                                                                        id="Description"
                                                                        onChange={(e) => setSeoSection({ ...seoSection, description: e.target.value })}
                                                                        placeholder="Enter Meta Description"></textarea>
                                                                </div>
                                                            </div>
                                                            <SeoImg seoSection={seoSection} setSeoSection={setSeoSection} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="update__block">
                                            <NavLink className="btn btn__cancel" to="/blogadmin">Cancel</NavLink>
                                            <button className="btn btn__update" onClick={handleSubmit}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default BlogUpdate;
