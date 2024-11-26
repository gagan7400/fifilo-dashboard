import { useEffect, useState } from "react";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import CaseStudies from "./pages/CaseStudies.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import { Routes, Route } from "react-router-dom";
import $ from "jquery"; // import jQuery
import anime from "animejs";
import Career from "./pages/Career.jsx";
import CureHub from "./casestudies/CureHub.jsx";
import FestiveFolks from "./casestudies/FestiveFolks.jsx";
import Interact from "./casestudies/Interact.jsx";
import SPVMortgages from "./casestudies/SPVMortgages.jsx";
import TribeStays from "./casestudies/TribeStays.jsx";
import MyChoize from "./casestudies/MyChoize.jsx";
import TwChallenge from "./casestudies/TwCallenge.jsx";
import FlipFolder from "./casestudies/FlipFolder.jsx";
import ThankYou from "./pages/ThankYou.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import ScrollToTop from "./layout/Scrolltotop.jsx";
import AOS from "aos";
import "owl.carousel";
import "aos/dist/aos.css";
import Login from './Admin/Login.jsx';
import ProtectedRoute from './Protectedroute/ProtectedRoute.jsx';
import Dashboard from './Admin/Dashboard.jsx';
import Careerpage from './Admin/Careerpage.js';
import Aboutpage from './Admin/Aboutpage.js';
import Contactpage from './Admin/Contactpage.js';
import Servicespage from './Admin/Servicespage.js';
import Profile from './Admin/Profile.jsx';
import { useDispatch } from 'react-redux';
import { loaduser } from './redux/actions/adminloginaction.js';
import Careerform from './pages/CareerForm.jsx';
import Homepage from './Admin/Homepage.js';
import Faqpage from './Admin/Faqpage.js';
import Pages from './Admin/Pages.jsx';
import Jobpage from './Admin/Jobpage.jsx';
import CasestudyPages from './Admin/CasestudyPages.js';
import CasestudyPage from './Admin/CasestudyPage.js';
import Casestudy from './pages/Casestudy.jsx';
import Layout from "./pages/Layout.jsx";
import NotFound from "./pages/NotFound.jsx";
import Newcasestudy from "./Admin/Newcasestudy.js";
function App() {
  let dispatch = useDispatch();

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
        <Route path="/pages" element={<ProtectedRoute Component={<Pages />} />} />
        <Route path="/dashboard" element={<ProtectedRoute Component={<Dashboard />} />} />
        <Route path="/pages/home" element={<ProtectedRoute Component={<Homepage />} />} />
        <Route path="/section/casestudypages" element={<ProtectedRoute Component={<CasestudyPages />} />} />
        <Route path="/pages/casestudy/:name" element={<ProtectedRoute Component={<CasestudyPage />} />} />
        <Route path="/pages/casestudy/newcasestudy" element={<ProtectedRoute Component={<Newcasestudy />} />} />
        <Route path="/pages/career" element={<ProtectedRoute Component={<Careerpage />} />} />
        <Route path="/section/job" element={<ProtectedRoute Component={<Jobpage />} />} />
        <Route path="/pages/about" element={<ProtectedRoute Component={<Aboutpage />} />} />
        <Route path="/pages/contact" element={<ProtectedRoute Component={<Contactpage />} />} />
        <Route path="/pages/services" element={<ProtectedRoute Component={<Servicespage />} />} />
        <Route path="/section/faq" element={<ProtectedRoute Component={<Faqpage />} />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/profile" element={<ProtectedRoute Component={<Profile />} />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/career" element={<Career />} />
        <Route path="/careerform/:jobtype" element={<Careerform />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/casestudy/:name" element={<Casestudy />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/curehub" element={<CureHub />} />
        <Route path="/festive-folks" element={<FestiveFolks />} />
        <Route path="/interact" element={<Interact />} />
        <Route path="/spv-mortgages" element={<SPVMortgages />} />
        <Route path="/tribe-stays" element={<TribeStays />} />
        <Route path="/my-choize" element={<MyChoize />} />
        <Route path="/tw-challenge" element={<TwChallenge />} />
        <Route path="/flipfolder" element={<FlipFolder />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
