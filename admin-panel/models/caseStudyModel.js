const mongoose = require("mongoose");

const caseStudySchema = new mongoose.Schema({
    heroSection: {
        casestudyName: String,
        description: String,
        buttonsContent: String,
        workButtons: [{ url: String, name: String, _id: false }],
        heroImg: { filename: String, path: String },
        cardImg: { filename: String, path: String }
    },
    overviewSection: {
        briefInsight: {
            contentBox: { heading: String, description: String },
            overviewBox: [{ name: String, value: String, _id: false }]
        },
        coreIssue: { heading: String, description: String },
        Strategy: { heading: String, description: String }
    },
    designProcessSection: {
        heading: String,
        content: [{ _id: false, heading: String, description: String, icon: { filename: String, path: String, }, }]
    },
    sketches: {
        heading: String,
        description: String,
        imgs: [{ filename: String, path: String }]
    },
    styleGuideSection: {
        heading: String,
        description: String,
        sectionName: String,
        BrandcolorSections: [{ name: String, hex: String }],
        SecondaryColorSections: [{ name: String, hex: String }],
    },
    typographyData: {
        heading: String,
        fontFamily: String,
        fontTable: [{ fontSize: String, lineHeight: String, }],
    },
    updatedLook: { heading: String, description: String, imgs: [{ filename: String, path: String }] },
    fullWidthImg: [{ filename: String, path: String }],
    howFifiloDesignsDrives: { heading: String, description: String },
}, { timestamps: true });

let caseStudyModel = mongoose.model("casestudies", caseStudySchema);
module.exports = caseStudyModel;