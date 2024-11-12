const homepageModel = require("../models/HomepageModel.js");
const servicesModel = require("../models/servicesModel");
const aboutModel = require("../models/aboutModel.js");
const { careerModel } = require("../models/careerModel");
let { contactPageModel } = require("../models/contactModel");
const getAllPages = async (req, res) => {
    try {
        const [data1, data2, data3, data4, data5] = await Promise.all([
            homepageModel.findOne({ published: true }), // Fetch all documents from Collection1
            servicesModel.findOne({ published: true }), // Fetch all documents from Collection2
            aboutModel.findOne({ published: true }), // Fetch all documents from Collection3
            careerModel.findOne({ published: true }), // Fetch all documents from Collection4
            contactPageModel.findOne({ published: true })  // Fetch all documents from Collection5
        ]);
        res.send({ data: [data1, data2, data3, data4, data5] });
    } catch (err) {
        res.status(400).send(err);
    }
};


module.exports = {
    getAllPages
};