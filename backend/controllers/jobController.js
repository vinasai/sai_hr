const Job = require('../models/Job');

exports.createJob = async(req,res)=>{
    try{
        const{companyName,jobTitle, companyAddress, salaryMinRange, salaryMaxRange, experinceYear,jobDescription,userId,email,jobType,city} = req.body
        
        const job = new Job({ companyName, jobTitle, companyAddress, salaryMinRange, salaryMaxRange, experinceYear, jobDescription,userId,email,jobType,city});
        await job.save();
        res.status(201).json({ msg: "Job created successfully" });

    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

exports.getJob = async(req,res)=>{
    try {
        const job = await Job.find();
        res.json(job);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

exports.getJobsByCompany = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const jobs = await Job.find({ userId: companyId }); 
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getJobId = async(req,res)=>{
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.json(job);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

exports.updateJob = async(req,res)=>{
    try{
        const{companyName,jobTitle, companyAddress, salaryMinRange, salaryMaxRange, experienceYear,jobDescription, email,jobType,city} = req.body
        const updateJob = await Job.findByIdAndUpdate(
            req.params.id,
            {companyName,jobTitle, companyAddress, salaryMinRange, salaryMaxRange, experienceYear,jobDescription,email,jobType,city},
            {new:true}
        );
        res.json(updateJob);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

exports.deleteJob = async(req,res)=>{
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: "Job deleted" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

exports.totalJob = async(req,res)=>{
  try {
    const jobCount = await Job.countDocuments();
    const cities = await Job.distinct("city");

    res.json({ totalJobs: jobCount, cities });
  } catch (error) {
    res.status(500).json({ message: "Error fetching job stats", error });
  }
}


