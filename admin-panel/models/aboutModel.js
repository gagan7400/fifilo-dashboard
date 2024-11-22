// models/about.js
const mongoose = require("mongoose");
// var Schema = mongoose.Schema;
// var ObjectIdSchema = Schema.ObjectId;
const aboutpageSchema = new mongoose.Schema({
    heroSection: {
        heading: String,
        subHeading: String,
        heroButtons: {
            CTA1: { url: String, name: String }
        }
    },
    aboutSection: {
        preHeading: String,
        heading: String,
        description: String
    },
    processSection: {
        preHeading: String,
        heading: String,
        content: [
            {
                _id: false,
                heading: String,
                description: String,
                icon: {
                    filename: {
                        type: String,
                        required: true,
                    },
                    path: {
                        type: String,
                        required: true,
                    },
                }
            }
        ]
    },
    teamSection: {
        preHeading: String,
        heading: String,
        description: String,
    },
    membersCard: [
        {
            _id: false,
            name: String,
            designation: String,
            linkedinUrl: String,
            memberImg: {
                filename: {
                    type: String,
                    required: true,
                },
                path: {
                    type: String,
                    required: true,
                }

            }
        }
    ],
    seoSection: {
        title: String,
        keywords: String,
        description: String,
        seoImg: { filename: String, path: String }
    },
    published: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

let aboutModel = mongoose.model("aboutpages", aboutpageSchema);
module.exports = aboutModel 