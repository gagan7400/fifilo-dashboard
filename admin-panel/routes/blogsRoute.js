const router = require("express").Router();
const { createBlog, getBlog, getBlogByName, deleteBlog, updateBlog
    , createBlogPage
    , updateBlogPage
    , getBlogPage
} = require("../controllers/blogsController.js");
const { isAdmin, authenticate } = require("../auth/Auth")




router.post('/createblog', createBlog);
router.get('/getblogs', getBlog);
router.get('/getblog/:name', getBlogByName);
router.delete('/deleteblog/:id', deleteBlog);
router.put('/updateblog/:id', updateBlog);


router.post('/createblogpage', authenticate, isAdmin, createBlogPage);
router.put('/updateblogpage/:id', authenticate, isAdmin, updateBlogPage);
router.get("/getblogpage", getBlogPage);


module.exports = router;


