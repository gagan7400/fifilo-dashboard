import React, { useCallback, useEffect, useState } from 'react';
import AOS from 'aos';
import { Helmet } from "react-helmet";
import Spinner from 'react-bootstrap/Spinner';
import 'aos/dist/aos.css';
import DOMPurify from 'dompurify';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import { useSelector, useDispatch } from 'react-redux'
import { contactus, getPublishContactPage } from '../redux/actions/contactAction';
export default function ContactUs() {

  let dispatch = useDispatch();
  const { success, loading } = useSelector((state) => state.contact);
  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")
  const [Number, setNumber] = useState("")
  const [Message, setMessage] = useState("")
  const [servicerequired, setservicerequired] = useState("")
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  let { publishedcontactdata, publishedcontactloading } = useSelector((state) => state.contactpage);
  const handleWindowLaod = useCallback(() => {
    console.log("load")
  }, []);
  useEffect(() => {
    window.addEventListener("load", handleWindowLaod);

    return () => {
      window.removeEventListener("load", handleWindowLaod);
    }
  }, [handleWindowLaod, publishedcontactloading])

  useEffect(() => {
    dispatch(getPublishContactPage());
  }, [dispatch])

  useEffect(() => {
    AOS.init();
  }, [publishedcontactdata]);


  const validate = () => {
    const newErrors = {};

    if (!Name) {
      newErrors.name = 'Name is required';
    } else if (Name.length < 3) {
      newErrors.name = 'Name must be at least 3 letters';
    }
    if (!Email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!Number) {
      newErrors.number = 'Phone number is required';
    } else if (!/^\d{10}$/.test(Number)) {
      newErrors.number = 'Phone number is invalid';
    }
    if (!Message) {
      newErrors.message = 'Message is required';
    } else if (Message.length < 3) {
      newErrors.message = 'Message must be at least 3 letters';
    }
    if (!servicerequired) {
      newErrors.message = 'servicerequired is required';
    }
    return newErrors;
  };

  useEffect(() => {
    if (showErrors) {
      const timer = setTimeout(() => {
        setShowErrors(false);
        setErrors({});
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showErrors]);
  const submithandler = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShowErrors(true);
    } else {
      let date = new Date();
      setErrors({});
      setShowErrors(false);
      let formdata = new FormData();
      formdata.append('Name', Name);
      formdata.append('Email', Email);
      formdata.append('PhoneNumber', Number);
      formdata.append('Message', Message);
      formdata.append('Servicerequired', servicerequired);
      formdata.append('Date', date.toLocaleDateString());
      fetch("https://script.google.com/macros/s/AKfycbx47sHgIKLw2QEnhmrZ2EyxiUF7tvTCyx31T0dPESi-Z1YCIxRCOyPD8MAO_wKc_hrG4Q/exec", {
        method: "POST",
        body: formdata,
      })
      dispatch(contactus({ name: Name, email: Email, phonenumber: Number, message: Message, servicerequired }))
    }
  }
  useEffect(() => {
    if (success) {
      setEmail('')
      setMessage("")
      setNumber("");
      setName("")
      setservicerequired("");
      setEmail("")
    }
  }, [success])

  return (
    <>
      <Helmet>
        <title>{(!publishedcontactloading && publishedcontactdata) && publishedcontactdata.seoSection.title.trim()}</title>
        {(!publishedcontactloading && publishedcontactdata) ? publishedcontactdata.seoSection.meta.map((v, i) => {
          return <meta key={i} name={v.name.trim()} content={v.content.trim()} />
        }) : ""}

      </Helmet>
      <div className="contact__bnr bg__dark">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row justify-content-between align-items-center">
                <div className="col-lg-5 col-md-5">
                  <div className="left__bx" data-aos="fade-up" data-aos-duration="800">
                    <h2 dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(!publishedcontactloading && publishedcontactdata ? publishedcontactdata.heroSection.heading : `Contact with Us`)
                    }} />
                    <p dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(!publishedcontactloading && publishedcontactdata ? publishedcontactdata.heroSection.subHeading : `We're here to connect, collaborate, and bring your ideas to life. Whether you're ready to embark on
                                            an exciting project or simply wish to explore how we can support your vision.`)
                    }} />
                    <div className="card__bx">
                      <h5 dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(!publishedcontactloading && publishedcontactdata ? publishedcontactdata.cardSection.heading : `Got a project  Or a <br />
                                                partnership in mind?`)
                      }} />
                      <ul>
                        {/* {console.log(!publishedcontactloading && publishedcontactdata && publishedcontactdata.cardSection.email)} */}
                        <li><a href={`mailto:${!publishedcontactloading && publishedcontactdata ? publishedcontactdata.cardSection.email : "hey@fifilo.com"}`}><img src="assets/img/mail-01.svg" alt="mail" />{!publishedcontactloading && publishedcontactdata ? publishedcontactdata.cardSection.email : "hey@fifilo.com"}</a>
                        </li>
                        <li><a href={`tel:${!publishedcontactloading && publishedcontactdata ? publishedcontactdata.cardSection.phoneNumber : "+91-7869525027"}`}><img src="assets/img/phone.svg" alt="mail" />{!publishedcontactloading && publishedcontactdata ? publishedcontactdata.cardSection.phoneNumber : "+91-7869525027"}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <form onSubmit={submithandler}>
                    <div className="form__card">
                      <div className="contact__form" data-aos="fade-up" data-aos-duration="800">
                        <div className="inr__input" >
                          <span><img src="assets/img/user-01.svg" alt="contact__form" /></span>
                          <input
                            type="text"
                            name="Name"
                            value={Name}
                            onChange={(e) => { setName(e.target.value) }}
                            className="form-control"
                            placeholder="Your Name"
                            autoComplete='off'

                          />
                          {errors.name && <div className="error text-danger position-absolute" style={{ color: "#f0f1f1" }}>{errors.name}</div>}
                        </div>
                        <div className="inr__input" >
                          <span><img src="assets/img/mail-02.svg" alt="contact__form" /></span>
                          <input
                            type="email"
                            name="Email"
                            value={Email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            className="form-control"
                            placeholder="Your E-mail"
                            autoComplete='off'

                          />
                          {errors.email && <div className="error text-danger position-absolute" style={{ color: "#f0f1f1" }} >{errors.email}</div>}
                        </div>
                        <div className="inr__input"  >
                          <span><img src="assets/img/phone-02.svg" alt="contact__form" /></span>
                          <input
                            type="text"
                            name="Number"
                            value={Number}
                            onChange={(e) => { setNumber(e.target.value) }}
                            className="form-control"
                            placeholder="Your Number"
                            autoComplete='off'
                          />
                          {errors.number && <div className="error text-danger position-absolute" style={{ color: "#f0f1f1" }} >{errors.number}</div>}
                        </div>
                        <div className="inr__input"  >
                          <span><img src="assets/img/message.svg" alt="contact__form" /></span>
                          <input
                            type="text"
                            name="Message"
                            value={Message}
                            onChange={(e) => { setMessage(e.target.value) }}
                            className="form-control"
                            placeholder="Your Message"
                            autoComplete='off'
                          />
                          {errors.message && <div className="error text-danger position-absolute" style={{ color: "#f0f1f1" }} >{errors.message}</div>}
                        </div>
                        <div className="inr__input"  >
                          <span><img src="assets/img/message.svg" alt="contact__form" /></span>
                          <input
                            type="text"
                            name="servicerequired"
                            value={servicerequired}
                            onChange={(e) => { setservicerequired(e.target.value) }}
                            className="form-control"
                            placeholder="Your servicerequired"
                            autoComplete='off'
                          />
                          {errors.servicerequired && <div className="error text-danger position-absolute" style={{ color: "#f0f1f1" }} >{errors.message}</div>}
                        </div>
                        <div>
                          <button className="btn btn__primary" type="submit">Submit
                            {loading ? <Spinner
                              animation="border"
                              role="status"
                              as="span"
                              size="sm"
                              aria-hidden="true"
                            >
                              <span className="visually-hidden">Loading...</span>
                            </Spinner> :
                              <img src="assets/img/arrow-up-right.svg" alt="contact__form" />
                            }
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import $ from "jquery"; // import jQuery
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Loader from "../layout/Loader";

// export default function ContactUs() {

//   useEffect(() => {
//     $(document).ready(function () {
//       if (window.location.pathname === '/contact-us/') {
//         $('.footer').addClass('contact-footer');
//       } else {
//         $('.footer').removeClass('contact-footer');
//       }
//     });
//   }, []);

//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     AOS.init();

//     const handleMessage = (event) => {
//       if (event.data === 'formSubmitted') {
//         navigate('/thank-you/');
//       }
//     };

//     window.addEventListener('message', handleMessage);

//     return () => {
//       window.removeEventListener('message', handleMessage);
//     };
//   }, [navigate]);

//   const handleIframeLoad = () => {
//     setLoading(false);
//   };

//   return (
//     <div className="contactPage bg__dark">
//       {loading && <Loader />}
//       <iframe
//         src="https://www.fifilo.com/contact/"
//         width="100%"
//         frameBorder="0"
//         onLoad={handleIframeLoad}
//         style={{ display: loading ? 'none' : 'block' }}
//       ></iframe>
//     </div>
//   );
// }
