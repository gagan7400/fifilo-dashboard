const mongoose = require("mongoose");

let servicesSchema = new mongoose.Schema({
    heroSection: {
        heading: String,
        subHeading: String
    },
    servicesCards: [
        {
            _id: false,
            cardName: String,
            cardDescription: [String, String],
            cardList: [String, String],
            serviceImg: { filename: String, path: String }
        }
    ],
    toolSection: {
        heading: String,
        toolsLogo: [{
            _id: false,
            filename: {
                type: String,
                required: true,
            },
            path: {
                type: String,
                required: true,
            }
        }]
    },
    published: {
        type: Boolean,
        default: false
    }


}, { timestamps: true });

const servicesModel = mongoose.model("services", servicesSchema);
module.exports = servicesModel

