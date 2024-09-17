import { Job } from "../models/job.model.js";

//The Job will be posted by admin
export const postJob = async (req, res) => {
  try {
    const {title, description, requirements, salary, location, jobType, experience, position, companyId} = req.body;

    const userId = req.id;

    if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId ) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
    
  } catch (error) {
    console.log(error);
  }
};

// for the students

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    /*
        The query object uses MongoDB’s $or operator to search for jobs where either the title or description fields contain the keyword.
        $regex is a MongoDB operator that performs a search using a regular expression. The { $options: "i" } makes the search case-insensitive.
        This query is searching for jobs whose titles or descriptions match the provided keyword. */

    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

      /*
      populate is used to fetch related data from another collection (in this case, the company associated with the job).
      path: "company" means that the company field in the Job model, which is a reference to another collection, will be populated with the corresponding company details.
      .sort({ createdAt: -1 }) sorts the results in descending order based on the createdAt field, meaning the newest jobs will be listed first. */

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });

  } catch (error) {
    console.log;
  }
};

// for accessing by student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};

// following api get to know about how many job posted by the admin

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
    
  } catch (error) {
    console.log(error);
  }
};
