const router = require("express").Router();
const { createBlog, getBlog } = require("../controllers/blogsController.js");
const { isAdmin, authenticate } = require("../auth/Auth")

router.post('/createblog', createBlog);
router.get('/getblogs', getBlog);

module.exports = router;


