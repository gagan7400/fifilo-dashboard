import { useEffect } from "react";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import CaseStudies from "./pages/CaseStudies.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import { Routes, Route, } from "react-router-dom";
import $ from "jquery";
import anime from "animejs";
import Career from "./pages/Career.jsx";
import ThankYou from "./pages/ThankYou.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import ScrollToTop from "./layout/Scrolltotop.jsx";
import AOS from "aos";
import "owl.carousel";
import { useDispatch, useSelector } from 'react-redux';
import { loaduser } from './redux/actions/adminloginaction.js';
import "aos/dist/aos.css";
import Login from './Admin/Login.jsx';
import ProtectedRoute from './Protectedroute/ProtectedRoute.jsx';
import Dashboard from './Admin/Dashboard.jsx';
import BlogAdmin from './Admin/BlogAdmin.js';
import Careerpage from './Admin/Careerpage.js';
import Aboutpage from './Admin/Aboutpage.js';
import Contactpage from './Admin/Contactpage.js';
import Servicespage from './Admin/Servicespage.js';
import Careerform from './pages/CareerForm.jsx';
import Homepage from './Admin/Homepage.js';
import Faqpage from './Admin/Faqpage.js';
import Pages from './Admin/Pages.jsx';
import Jobpage from './Admin/Jobpage.jsx';
import CasestudyPages from './Admin/Casestudies.js';
import Casestudyadmin from './Admin/Casestudy.js';
import Casestudy from './pages/Casestudy.jsx';
import Layout from "./pages/Layout.jsx";
import NotFound from "./pages/NotFound.jsx";
import Newcasestudy from "./Admin/Newcasestudy.js";
import Casestudypage from "./Admin/Casestudypage.jsx";
import MediaSection from "./Admin/MediaSection.js";
import Blog from "./pages/Blog.jsx";
import Singleblog from "./pages/Singleblog.jsx";
import NewBlog from "./Admin/NewBlog.js";
import BlogUpdate from "./Admin/BlogUpdate.js";
import BlogPage from "./Admin/BlogPage.js";
import PrivacyPage from "./Admin/PrivacyPage.jsx";
import { getCaseStudies, getPublishCasestudyPage } from "./redux/actions/casestudyAction.js";
import { getjobs, getpublishCareerPage } from "./redux/actions/careeraction.js";
import { getPublishContactPage } from "./redux/actions/contactAction.js";
import { getPublishPrivacyPage } from "./redux/actions/privacyAction.js";
import { getpublishHomePage } from "./redux/actions/homeAction.js";
import { getpublishServicePage } from "./redux/actions/servicesAction.js";
import { getBlogs, getPublishBlogPage } from "./redux/actions/blogAction.js";
import { getPublishAboutPage } from "./redux/actions/aboutAction.js";
function App() {
  let dispatch = useDispatch();
  let { publishedcasestudydata, casestudyloading  ,casestudies} = useSelector((state) => state.casestudy);
  let { publishedprivacydata, privacyloading } = useSelector((state) => state.privacy);
  let { jobs, jobloading } = useSelector((state) => state.jobs);
  let { publishedcareerdata, publishedcareerloading } = useSelector((state) => state.careerpage);
  let { publishedcontactdata, publishedcontactloading } = useSelector((state) => state.contactpage);
  let { publishedhomepage, homeloading } = useSelector((state) => state.homepage);
  let { publishedServicePage, publishedServiceLoading } = useSelector(state => state.services);
  let { blogdata, blogloading, error, publishedblogdata } = useSelector(state => state.blog)
  let { publishedData, publishedLoading } = useSelector((state) => state.about);
  useEffect(() => {
    if (!publishedcareerdata) {
      dispatch(getpublishCareerPage());
    }
    if (!jobs.length) {
      dispatch(getjobs());
    }
  }, []);
  // about page 
  useEffect(() => {
    if (!publishedData) {
      dispatch(getPublishAboutPage());
    }

  }, [dispatch])
  // blog page 
  useEffect(() => {
    if (!publishedblogdata) {
      dispatch(getPublishBlogPage())
    }
    if (!blogdata) {
      dispatch(getBlogs())
    }
  }, [])
  // services useeffect
  useEffect(() => {
    if (!publishedServicePage) {

      dispatch(getpublishServicePage())
    }
  }, [dispatch])
  // home useeffect
  useEffect(() => {
    if (!publishedhomepage) {
      dispatch(getpublishHomePage());
    }

  }, [dispatch])
  // 
  useEffect(() => {
    if (!publishedcontactdata) {
      dispatch(getPublishContactPage());
    }
  }, [dispatch])
  useEffect(() => {
    if (!publishedcasestudydata) {
      dispatch(getPublishCasestudyPage());
    }
    if (!casestudies) {
      dispatch(getCaseStudies());
    }
  }, [])
  useEffect(() => {
    if (!publishedprivacydata) {
      dispatch(getPublishPrivacyPage());
    }
  }, [])
  useEffect(() => {
    $(document).ready(function () {
      function fitElementToParent(el, padding) {
        var timeout = null;
        function resize() {
          if (timeout) clearTimeout(timeout);
          anime.set(el, { scale: 1 });
          var pad = padding || 0;
          var parentEl = el.parentNode;
          var elOffsetWidth = el.offsetWidth - pad;
          var parentOffsetWidth = parentEl.offsetWidth;
          var ratio = parentOffsetWidth / elOffsetWidth;
          timeout = setTimeout(anime.set(el, { scale: ratio }), 10);
        }
        resize();
        window.addEventListener("resize", resize);
      }
    });
  });
  useEffect(() => {
    AOS.init();
  });
  useEffect(() => {
    dispatch(loaduser())
  }, [dispatch])
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/pages/" element={<ProtectedRoute Component={<Pages />} />} />
        <Route path="/dashboard/" element={<ProtectedRoute Component={<Dashboard />} />} />
        <Route path="/pages/home/" element={<ProtectedRoute Component={<Homepage />} />} />
        <Route path="/pages/blog/" element={<ProtectedRoute Component={<BlogPage />} />} />
        <Route path="/blogadmin/" element={<ProtectedRoute Component={<BlogAdmin />} />} />
        <Route path="/blogadmin/newblog" element={<ProtectedRoute Component={<NewBlog />} />} />
        <Route path="/blogadmin/:name" element={<ProtectedRoute Component={<BlogUpdate />} />} />
        <Route path="/casestudies/" element={<ProtectedRoute Component={<CasestudyPages />} />} />
        <Route path="/pages/casestudies/" element={<ProtectedRoute Component={<Casestudypage />} />} />
        <Route path="/casestudies/:name/" element={<ProtectedRoute Component={<Casestudyadmin />} />} />
        <Route path="/casestudies/newcasestudy/" element={<ProtectedRoute Component={<Newcasestudy />} />} />
        <Route path="/pages/career/" element={<ProtectedRoute Component={<Careerpage />} />} />
        <Route path="/section/job/" element={<ProtectedRoute Component={<Jobpage />} />} />
        <Route path="/pages/about/" element={<ProtectedRoute Component={<Aboutpage />} />} />
        <Route path="/pages/privacypolicy/" element={<ProtectedRoute Component={<PrivacyPage />} />} />
        <Route path="/pages/contact/" element={<ProtectedRoute Component={<Contactpage />} />} />
        <Route path="/pages/services/" element={<ProtectedRoute Component={<Servicespage />} />} />
        <Route path="/section/faq/" element={<ProtectedRoute Component={<Faqpage />} />} />
        <Route path="/section/media/" element={<ProtectedRoute Component={<MediaSection />} />} />
        <Route path="/admin/" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/about/" element={<About />} />
        <Route path="/services/" element={<Services />} />
        <Route path="/career/" element={<Career />} />
        <Route path="/blogs/" element={<Blog />} />
        <Route path="/blogs/:name" element={<Singleblog />} />
        <Route path="/careerform/:jobtype/" element={<Careerform />} />
        <Route path="/contact-us/" element={<ContactUs />} />
        <Route path="/case-studies/" element={<CaseStudies />} />
        <Route path="/:name/" element={<Casestudy />} />
        <Route path="/thank-you/" element={<ThankYou />} />
        <Route path="/privacy-policy/" element={<PrivacyPolicy />} />
        <Route path="/not-found/" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
