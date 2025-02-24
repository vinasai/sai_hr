const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Company = require("../models/Company");
const Job = require("../models/Job");

require('dotenv').config();
// Register 
exports.registerCompany = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    let company = await Company.findOne({ email });
    if (company) return res.status(400).json({ msg: "Company already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    company = new Company({ name, email, password: hashedPassword, phone, role });
    await company.save();

    res.status(201).json({ msg: "Company registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login 
exports.loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    const company = await Company .findOne({ email });
    if (!company) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: company._id, role: company.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      company: { id: company._id, name: company.name, email: company.email, role: company.role }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCompany = async (req,res)=>{
try {
    const company = await Company.find();
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getCompanyId = async (req,res)=>{
  try {
      const company = await Company.findById(req.params.id);
      if (!company) return res.status(404).json({ message: "Company not found" });
      res.json(organizer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  exports.updateCompany = async (req, res) => {
    try {
      const { name, email, phone, role } = req.body;
      const updatedCompany = await Company.findByIdAndUpdate(
        req.params.id,
        { name, email, phone, role },
        { new: true, runValidators: true }
      );
  
      if (!updatedCompany) return res.status(404).json({ msg: "Company not found" });
  
      res.json({ msg: "Company updated successfully", updatedCompany });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
// Delete company 
exports.deleteCompany = async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) {
      return res.status(404).json({ msg: "Company not found" });
    }

    // Delete all jobs related to the company
    await Job.deleteMany({ userId: req.params.id });

    res.json({ msg: "Company and associated jobs deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


  exports.changePassword = async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const company = await Company.findById(req.params.id);
  
      if (!company) return res.status(404).json({ msg: "Company not found" });
  
      // Compare old password
      const isMatch = await bcrypt.compare(oldPassword, company.password);
      if (!isMatch) return res.status(400).json({ msg: "Old password is incorrect" });
  
      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      company.password = hashedPassword;
      await company.save();
  
      res.json({ msg: "Password changed successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  