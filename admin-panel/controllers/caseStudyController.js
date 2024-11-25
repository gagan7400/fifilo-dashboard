// controllers/JobController.js
const mongoose = require("mongoose");
const caseStudyModel = require("../models/caseStudyModel.js");

const createCaseStudy = async (req, res) => {
    try {
        const { heroSection, overviewSection, designProcessSection, sketches, styleGuideSection } = req.body;
        const caseStudy = new caseStudyModel({ heroSection, overviewSection, designProcessSection, sketches, styleGuideSection });
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
const getCaseStudyByName = async (req, res) => {
    try {
        let { name } = req.params;
        const result = await caseStudyModel.findOne({ "heroSection.casestudyName": name });
        console.log(result, name)
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
        const { heroSection, overviewSection, sketches, designProcessSection, styleGuideSection } = req.body;

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
        if (designProcessSection) {
            casestudy.designProcessSection = {
                ...casestudy.designProcessSection,
                ...designProcessSection
            };
        }
        if (sketches) {
            casestudy.sketches = {
                ...casestudy.sketches,
                ...sketches
            };
        }
        if (styleGuideSection) {
            casestudy.styleGuideSection = {
                ...casestudy.styleGuideSection,
                ...styleGuideSection
            };
        }
        casestudy.updatedAt = Date.now();

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
    deleteCaseStudy,
    getCaseStudyByName
};

