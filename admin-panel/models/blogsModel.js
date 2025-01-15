// models/blogpage.js
const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
    heading: String,
    uploadedBy: String,
    approxTime: String,
    blogcategory: String,
    bannerImg: { filename: String, path: String },
    blogContent: String,
    tableOfContent: [
        { heading: String, id: String, _id: false },
    ]
}, { timestamps: true })

let blogsModel = mongoose.model("blogs", blogsSchema);
module.exports = {blogsModel};

