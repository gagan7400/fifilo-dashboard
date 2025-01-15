// controllers/blogController.js
const { blogsModel } = require("../models/blogsModel.js");

const createBlog = async (req, res) => {
    try {
        req.body;
        const blog = new blogsModel(req.body);
        await blog.save();
        res.status(201).json({ success: true, data: blog });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
const getBlog = async (req, res) => {
    try {
        const blog = await blogsModel.find();
        res.send({ success: true, data: blog });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

module.exports = {
    createBlog,

    getBlog
};

