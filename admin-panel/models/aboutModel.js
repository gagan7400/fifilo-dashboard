// models/about.js
const mongoose = require("mongoose");
// var Schema = mongoose.Schema;
// var ObjectIdSchema = Schema.ObjectId;
const aboutpageSchema = new mongoose.Schema({
    heroSection: {
        heading: String,
        subHeading: String
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
                description: String
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
                },
                membernumber: {
                    type: Number,
                }
            }
        }
    ],
    published: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

let aboutModel = mongoose.model("aboutpages", aboutpageSchema);
module.exports = aboutModel 