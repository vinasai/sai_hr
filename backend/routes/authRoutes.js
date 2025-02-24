const express = require("express");
const { registerCompany, loginCompany, getCompany, getCompanyId, changePassword, deleteCompany, updateCompany } = require("../controllers/authController");

const router = express.Router();

// Register Route
router.post("/register", registerCompany);

// Login Route
router.post("/login", loginCompany);

//getuserbyid
router.get("/get/:id",getCompanyId);

router.get("/get",getCompany);

router.delete("/delete/:id",deleteCompany);

router.put("/update/:id",updateCompany);

router.put("/change-password/:id", changePassword);

module.exports = router;

