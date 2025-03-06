const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const {
      jobTitle, salaryMinRange, salaryMaxRange, 
      experienceYear, jobDescription, userId, city, 
      ageLimitMin, ageLimitMax, workingHours, overtime, education, 
      drivingLicence, accommodation, transportation, food, specialTraining, 
      specialSkill, specialNotes
    } = req.body;

    // Validation
    if ( !jobTitle ||  !jobDescription || !userId  || !city) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }
    
    if (salaryMinRange >= salaryMaxRange) {
      return res.status(400).json({ error: "Max Salary must be greater than Min Salary" });
    }

    const job = new Job({
      jobTitle, salaryMinRange, salaryMaxRange, 
      experienceYear, jobDescription, userId, city, 
      ageLimitMin, ageLimitMax, workingHours, overtime, education, 
      drivingLicence, accommodation, transportation, food, specialTraining, 
      specialSkill, specialNotes
    });

    await job.save();
    res.status(201).json({ message: "Job created successfully", job });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
        const{jobTitle, salaryMinRange, salaryMaxRange, 
          experienceYear, jobDescription, userId, city, 
          ageLimitMin, ageLimitMax, workingHours, overtime, education, 
          drivingLicence, accommodation, transportation, food, specialTraining, 
          specialSkill, specialNotes} = req.body
        const updateJob = await Job.findByIdAndUpdate(
            req.params.id,
            {jobTitle, salaryMinRange, salaryMaxRange, 
              experienceYear, jobDescription, userId, city, 
              ageLimitMin, ageLimitMax, workingHours, overtime, education, 
              drivingLicence, accommodation, transportation, food, specialTraining, 
              specialSkill, specialNotes},
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


