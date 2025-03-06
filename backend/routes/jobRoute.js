const express = require("express");
const {createJob, getJob, getJobId, updateJob, deleteJob, getJobsByCompany, totalJob} = require("../controllers/jobController")
const router = express.Router();

router.post("/create", createJob);
router.get("/get", getJob);
router.get("/get/:id", getJobId);
router.put("/update/:id", updateJob);
router.delete("/delete/:id", deleteJob)
router.get('/jobs/:companyId', getJobsByCompany);
router.get('/count', totalJob);

module.exports = router;
