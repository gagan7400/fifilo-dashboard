// controllers/JobController.js
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const aboutModel = require("../models/aboutModel.js");

const createAboutPage = async (req, res) => {
    try {
        const { heroSection, aboutSection, processSection, teamSection, membersCard } = req.body;

        // Handling image upload
        const memberImgs = req.files.map(file => ({
            filename: file.filename, // Use filename from Multer
            path: file.path,
            // Use path from Multer
        }));
        const newmemeberSection = membersCard.map((card, index) => ({
            name: card.name,
            designation: card.designation,
            linkedinUrl: card.linkedinUrl,
            memberImg: { ...memberImgs[index], membernumber: index }
        }));
        const aboutPage = new aboutModel({
            heroSection,
            aboutSection,
            processSection,
            teamSection,
            membersCard: newmemeberSection,
        });

        await aboutPage.save();

        res.status(201).json({ success: true, data: aboutPage, files: req.files });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getAboutPage = async (req, res) => {
    try {
        const result = await aboutModel.find();
        res.send({ data: result });
    } catch (err) {
        res.status(400).send(err);
    }
};
const getPublishedAboutPage = async (req, res) => {
    try {
        const result = await aboutModel.findOne({ published: true });
        res.send({ data: result });
    } catch (err) {
        res.status(400).send(err);
    }
};
const publishAboutPage = async (req, res) => {
    try {
        const newPublishedId = req.params.id;
        await aboutModel.updateMany({ published: true }, { $set: { published: false } });
        const publishedData = await aboutModel.findByIdAndUpdate(newPublishedId, { $set: { published: true } }, { new: true });
        // const data = await aboutModel.findByIdAndUpdate({ _id: '670bb054919ffe3d949b0f63' }, req.body)
        // const result = await aboutModel.findById('670bb054919ffe3d949b0f63');
        res.send({ data: publishedData });
    } catch (err) {
        res.status(400).send(err);
    }
};

const deleteAboutPage = async (req, res) => {

    try {
        // Step 1: Find the About page by ID
        const aboutpage = await aboutModel.findById(req.params.id);

        if (!aboutpage) {
            return res.status(404).json({ success: false, message: 'About page not found' });
        }

        // Step 2: Delete associated images
        if (aboutpage.membersCard && aboutpage.membersCard.length > 0) {
            aboutpage.membersCard.forEach((card) => {
                const imagePath = path.join(__dirname, '../', card.memberImg.path);
                // Check if file exists and delete
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath); // Delete the image file
                }
            });

        }

        // Step 3: Delete the About page document
        await aboutModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: 'About page and images deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// const updateAboutPage = async (req, res) => {
//     try {
//         const { id } = req.params; // we're updating the about page by ID
//         const { heroSection, aboutSection, processSection, teamSection, membersCard } = req.body;

//         // Handling image uploads
//         const memberImgs = req.files ? req.files.map(file => ({
//             filename: file.filename,
//             path: file.path
//         })) : [];

//         // Find the existing about page by ID
//         const aboutPage = await aboutModel.findById(id);

//         if (!aboutPage) {
//             return res.status(404).json({ success: false, message: "About page not found" });
//         }

//         // Update hero section
//         if (heroSection) {
//             aboutPage.heroSection = {
//                 ...aboutPage.heroSection,
//                 ...heroSection
//             };
//         }

//         // Update about section
//         if (aboutSection) {
//             aboutPage.aboutSection = {
//                 ...aboutPage.aboutSection,
//                 ...aboutSection
//             };
//         }

//         // Update process section
//         if (processSection) {
//             aboutPage.processSection = {
//                 ...aboutPage.processSection,
//                 ...processSection
//             };
//         }

//         // Update team section
//         if (teamSection) {
//             aboutPage.teamSection = {
//                 ...aboutPage.teamSection,
//                 ...teamSection
//             };
//         }

//         // Update members card section (with image handling)
//         if (membersCard) {
//             if (memberImgs.length > 0) {
//                 aboutPage.membersCard.forEach((card) => {
//                     if (card.memberImg) {
//                         const imagePath = path.join(__dirname, '../', card.memberImg.path);
//                         // Check if file exists and delete
//                         if (fs.existsSync(imagePath)) {
//                             fs.unlinkSync(imagePath); // Delete the image file
//                         }
//                     }
//                 });
//             }
//             aboutPage.membersCard = membersCard.map((card, index) => ({
//                 name: card.name || aboutPage.membersCard[index]?.name,
//                 designation: card.designation || aboutPage.membersCard[index]?.designation,
//                 linkedinUrl: card.linkedinUrl || aboutPage.membersCard[index]?.linkedinUrl,
//                 memberImg: memberImgs[index] || aboutPage.membersCard[index]?.memberImg
//             }));
//         }

//         // Update timestamps
//         aboutPage.updatedAt = Date.now();

//         // Save the updated about page
//         await aboutPage.save();

//         res.status(200).json({ success: true, data: aboutPage });
//     } catch (err) {
//         console.error("Error updating about page:", err);
//         res.status(500).json({ success: false, message: err.message });
//     }
// };

// const updateAboutPage = async (req, res) => {
//     try {
//         const { id } = req.params; // we're updating the about page by ID
//         const { heroSection, aboutSection, processSection, teamSection, membersCard } = req.body;

//         // Handling image uploads
//         const memberImgs = req.files ? req.files.map(file => ({
//             filename: file.filename,
//             path: file.path
//         })) : [];

//         // Find the existing about page by ID
//         const aboutPage = await aboutModel.findById(id);

//         if (!aboutPage) {
//             return res.status(404).json({ success: false, message: "About page not found" });
//         }

//         // Update hero section
//         if (heroSection) {
//             aboutPage.heroSection = {
//                 ...aboutPage.heroSection,
//                 ...heroSection
//             };
//         }

//         // Update about section
//         if (aboutSection) {
//             aboutPage.aboutSection = {
//                 ...aboutPage.aboutSection,
//                 ...aboutSection
//             };
//         }

//         // Update process section
//         if (processSection) {
//             aboutPage.processSection = {
//                 ...aboutPage.processSection,
//                 ...processSection
//             };
//         }

//         // Update team section
//         if (teamSection) {
//             aboutPage.teamSection = {
//                 ...aboutPage.teamSection,
//                 ...teamSection
//             };
//         }

//         // Update members card section (with image handling)
//         if (membersCard) {
//             membersCard.forEach((card, index) => {
//                 const existingCard = aboutPage.membersCard[index];
//                 const newImage = memberImgs[index];

//                 // Update individual fields, retaining existing data if not provided
//                 existingCard.name = card.name || existingCard.name;
//                 existingCard.designation = card.designation || existingCard.designation;
//                 existingCard.linkedinUrl = card.linkedinUrl || existingCard.linkedinUrl;

//                 // If a new image is provided, delete the old image and update with the new one
//                 if (newImage) {
//                     if (existingCard.memberImg) {
//                         const imagePath = path.join(__dirname, '../', existingCard.memberImg.path);
//                         // Check if file exists and delete
//                         if (fs.existsSync(imagePath)) {
//                             fs.unlinkSync(imagePath); // Delete the image file
//                         }
//                     }
//                     existingCard.memberImg = newImage;
//                 }
//             });
//         }

//         // Update timestamps
//         aboutPage.updatedAt = Date.now();

//         // Save the updated about page
//         await aboutPage.save();

//         res.status(200).json({ success: true, data: aboutPage });
//     } catch (err) {
//         console.error("Error updating about page:", err);
//         res.status(500).json({ success: false, message: err.message });
//     }
// };

const updateAboutPage = async (req, res) => {
    try {
        const { id } = req.params; // We're updating the about page by ID
        const { heroSection, aboutSection, processSection, teamSection, membersCard } = req.body;

        // Handling image uploads for members

        // const memberImgs = req.files ? req.files.map(file => ({
        //     filename: file.filename,
        //     path: file.path
        // })) : [];

        // Find the existing about page by ID
        const aboutPage = await aboutModel.findById(id);

        if (!aboutPage) {
            return res.status(404).json({ success: false, message: "About page not found" });
        }

        // Update hero section
        if (heroSection) {
            aboutPage.heroSection = {
                ...aboutPage.heroSection,
                ...heroSection
            };
        }

        // Update about section
        if (aboutSection) {
            aboutPage.aboutSection = {
                ...aboutPage.aboutSection,
                ...aboutSection
            };
        }

        // Update process section
        if (processSection) {
            aboutPage.processSection = {
                ...aboutPage.processSection,
                ...processSection
            };
        }

        // Update team section
        if (teamSection) {
            aboutPage.teamSection = {
                ...aboutPage.teamSection,
                ...teamSection
            };
        }

        // Update members card section (with image handling)
        // if (membersCard) {
        //     membersCard.forEach((card, index) => {
        //         const existingCard = aboutPage.membersCard[index]; // Get the existing member
        //         const newImage = memberImgs[index]; // Get the new image for this specific card

        //         // Update individual fields for the member
        //         existingCard.name = card.name || existingCard.name;
        //         existingCard.designation = card.designation || existingCard.designation;
        //         existingCard.linkedinUrl = card.linkedinUrl || existingCard.linkedinUrl;

        //         // If a new image is provided, delete the old image and update with the new one
        //         if (newImage) {
        //             if (existingCard.memberImg) {
        //                 const imagePath = path.join(__dirname, '../', existingCard.memberImg.path);
        //                 // Check if file exists and delete the old image
        //                 if (fs.existsSync(imagePath)) {
        //                     fs.unlinkSync(imagePath); // Delete the old image file
        //                 }
        //             }
        //             // Update the member's image with the new one
        //             existingCard.memberImg = newImage;
        //         }
        //     });
        // }
        if (membersCard) {
            aboutPage.membersCard = membersCard.map((card, index) => ({
                name: card.name || aboutPage.membersCard[index]?.name,
                designation: card.designation || aboutPage.membersCard[index]?.designation,
                linkedinUrl: card.linkedinUrl || aboutPage.membersCard[index]?.linkedinUrl,
                memberImg: card.memberImg || aboutPage.membersCard[index]?.memberImg
            }));
        }
        // Update the updatedAt timestamp
        aboutPage.updatedAt = Date.now();

        // Save the updated about page
        await aboutPage.save();

        res.status(200).json({ success: true, data: aboutPage });
    } catch (err) {
        console.error("Error updating about page:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    createAboutPage,
    getAboutPage,
    getPublishedAboutPage,
    publishAboutPage,
    deleteAboutPage,
    updateAboutPage
};

