const router = require("express").Router();
const { createCaseStudy, getCaseStudy, updateCaseStudy, deleteCaseStudy } = require("../controllers/caseStudyController.js");
const { isAdmin, authenticate } = require("../auth/Auth")

router.post('/createcasestudy', createCaseStudy);
router.get('/getcasestudy', getCaseStudy);
router.put('/updatecasestudy/:id', updateCaseStudy);
router.delete('/deletecasestudy/:id', deleteCaseStudy);

module.exports = router;


