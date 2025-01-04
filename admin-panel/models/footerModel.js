// models/footer.js
const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema({
    heading: String,
    redirectIcon: {
        icon: { filename: String, path: String },
        url: String,
    },
    links: [
        {
            page: { type: String },
            url: String,
        },
    ],
    socialMedia: [
        {
            iconUrl: { filename: String, path: String },
            link: { type: String },
        },
    ],
    logoUrl: { filename: String, path: String },
    copyrightText: { type: String },

}, { timestamps: true })

let footerModel = mongoose.model("footer", footerSchema);
module.exports = footerModel 