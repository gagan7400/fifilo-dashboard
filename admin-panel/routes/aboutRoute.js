const router = require("express").Router();
const {
    createAboutPage,
    getAboutPage,
    getPublishedAboutPage,
    publishAboutPage,
    deleteAboutPage,
    updateAboutPage

} = require("../controllers/aboutController");
const { isAdmin, authenticate } = require("../auth/Auth")

router.get("/getpublishedaboutpage", getPublishedAboutPage);
router.get("/getaboutpage", getAboutPage);
router.post('/createaboutpage', authenticate, isAdmin, createAboutPage);
router.put('/updateaboutpage/:id', authenticate, isAdmin, updateAboutPage);
router.put("/publishaboutpage/:id", authenticate, isAdmin, publishAboutPage);
router.delete("/deleteaboutpage/:id", authenticate, isAdmin, deleteAboutPage);

module.exports = router;


