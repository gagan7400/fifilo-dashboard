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

}, { timestamps: true })

let caseStudyModel = mongoose.model("casestudies", caseStudySchema);
module.exports = caseStudyModel;