import React, { act, useEffect, useState } from 'react'
import AOS from "aos";
import DOMPurify from 'dompurify';
import axios from 'axios';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
export default function Singleblog() {
    let { name } = useParams();
    let [blog, setBlog] = useState(null);
    let [blogs, setBlogs] = useState(null);
    let [loading, setLoading] = useState(true);
    let [blogsLoading, setBlogsLoading] = useState(true);
    let nav = useNavigate();
    let location = useLocation();
    useEffect(() => {
        getblog();
    }, [location]);
    let getblog = async () => {
        try {
            let { data } = await axios.get('http://localhost:5000/admin/blogs/getblog/' + name);
            if (data.success) {
                setBlog(data.data);
                setLoading(false)
            } else {
                setBlog(null);
                nav("/not-found")
            }
        } catch (error) {
            setBlog(null)

            nav("/not-found")
        }
    }
    let alldata = async () => {
        try {
            let { data } = await axios.get('http://localhost:5000/admin/blogs/getblogs');
            if (data.success) {
                setBlogs(data.data);
                setBlogsLoading(false)
            } else {
                setBlogs(null);
                alert("error occured");
            }
        } catch (error) {
            setBlog(null)
            setBlog(null);
        }
    }

    useEffect(() => {
        getblog();
        alldata();
    }, [])
    useEffect(() => {
        if (blog) {
            setLoading(false);
        }
    }, [blog]);
    useEffect(() => {
        if (blogs) {
            setBlogsLoading(false);
        }
    }, [blogs]);

    useEffect(() => {
        AOS.init();
    }, [blog]);


    let select = () => {
        const links = document.querySelectorAll(".tableOfContent li a");
        window.addEventListener("hashchange", () => {
            links.forEach((link) => {
                link.parentNode.className = ""
            });
            const activeLink = document.querySelector(`a[href="${location.pathname + location.hash}"]`);
            if (activeLink) {
                let p = activeLink.parentNode;
                p.classList.add("active");
            }   
        });
    }
    select();
    window.addEventListener("hashchange", select);

    return (
        <>
            <div className="blogs__bnr blog__single">
                <div className="container">
                    <div className="bnr__inr">
                        <div className="category" data-aos="fade-up" data-aos-duration="800">
                            <span>{!loading && blog && blog.blogCategory}</span>
                        </div>
                        <h2 data-aos="fade-up" data-aos-duration="800">{!loading && blog && blog.blogTitle}</h2>
                        <div className="card__ftr" data-aos="fade-up" data-aos-duration="800">
                            <span>By {!loading && blog && blog.uploadedBy}</span>
                            <span>•</span>
                            <span>{new Date(!loading && blog && blog.updatedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}</span>
                            <span>•</span>
                            <span>{!loading && blog && blog.approxTime} Read</span>
                        </div>
                        <div className="single__thumbnails" data-aos="fade-up" data-aos-duration="800">
                            <img src={`http://localhost:5000/images/${!loading && blog && blog.bannerImg.filename}`} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="single__content rn__section__gapTop">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9" dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(!loading && blog && blog.blogContent)
                        }} />
                        <div className="col-lg-3">
                            <div className="right__block">
                                <div className="table__card" data-aos="fade-up" data-aos-duration="800">
                                    <h5>Table of Contents</h5>
                                    <ul className='tableOfContent'>
                                        {!loading && blog && blog.tableOfContent.map((v, i) => {
                                            return <li className={i == 0 ? "active" : ""} key={i}><a href={`/blogs/${blog.blogUrl}/#${v.id}`}>{i + 1}. {v.heading}</a></li>
                                        })}
                                    </ul>
                                </div>

                                <div className="releted__blog" data-aos="fade-up" data-aos-duration="800">
                                    <h5>Related Blogs</h5>

                                    <div className="blogs__cards">
                                        {!blogsLoading && blogs && blogs.map((value, index) => {
                                            if (value._id != blog._id) {
                                                return (<div className="card__blog" key={index}>
                                                    <NavLink to={`/blogs/${value.blogUrl}/`}>
                                                        <div className="title">
                                                            <h6>{value.blogTitle}</h6>
                                                            <span><img src="assets/img/arrow-up-right.svg" alt="" /></span>
                                                        </div>
                                                    </NavLink>
                                                    <span className="description">{value.heading}</span>
                                                </div>)
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
