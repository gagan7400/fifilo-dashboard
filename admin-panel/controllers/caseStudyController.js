// controllers/JobController.js
const mongoose = require("mongoose");
const caseStudyModel = require("../models/caseStudyModel.js");

const createCaseStudy = async (req, res) => {
    try {
        const { heroSection, overview, casestudyName } = req.body;
        const caseStudy = new caseStudyModel({
            casestudyName,
            heroSection,
            overview
        });
        await caseStudy.save();
        res.status(201).json({ success: true, data: caseStudy });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getCaseStudy = async (req, res) => {
    try {
        const result = await caseStudyModel.find();
        res.send({ success: true, data: result });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
const deleteCaseStudy = async (req, res) => {

    try {
        const casestudypage = await caseStudyModel.findById(req.params.id);

        if (!casestudypage) {
            return res.status(404).json({ success: false, message: 'casestudy not found' });
        }
        await caseStudyModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: 'casestudy deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


const updateCaseStudy = async (req, res) => {
    try {
        const { id } = req.params; // We're updating the about  by ID
        const { heroSection ,overviewSection } = req.body;

        const casestudy = await caseStudyModel.findById(id);

        if (!casestudy) {
            return res.status(404).json({ success: false, message: "casestudy not found" });
        }
        if (heroSection) {
            casestudy.heroSection = {
                ...casestudy.heroSection,
                ...heroSection
            };
        }

        if (overviewSection) {
            casestudy.overviewSection = {
                ...casestudy.overviewSection,
                ...overviewSection
            };
        }
        // if (casestudyName) {
        //     casestudy.casestudyName = casestudyName
        // }
        casestudy.updatedAt = Date.now();

        // Save the updated about 
        await casestudy.save();

        res.status(200).json({ success: true, data: casestudy });
    } catch (err) {
        console.error("Error updating casestudy:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};


module.exports = {
    createCaseStudy,
    getCaseStudy,
    updateCaseStudy,
    deleteCaseStudy
};

