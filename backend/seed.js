import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";
import { Application } from "./models/application.model.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    console.log("Deleting old data...");

    await Application.deleteMany({});
    await Job.deleteMany({});
    await Company.deleteMany({});
    await User.deleteMany({});

    console.log("Old data deleted.");

    const hashedPassword = await bcrypt.hash("123456", 10);

    // -----------------------------
    // Recruiters
    // -----------------------------
    const recruiterData = [];

    for (let i = 1; i <= 10; i++) {
      recruiterData.push({
        fullname: `Recruiter ${i}`,
        email: `recruiter${i}@gmail.com`,
        phoneNumber: 9000000000 + i,
        password: hashedPassword,
        role: "recruiter",
        profile: {
          bio: "Technical Recruiter",
          skills: ["Hiring", "Communication"],
          profilePhoto: ""
        }
      });
    }

    const recruiters = await User.insertMany(recruiterData);

    console.log(`${recruiters.length} Recruiters Created`);

    // -----------------------------
    // Students
    // -----------------------------
    const skills = [
      ["React", "Node.js", "MongoDB"],
      ["Java", "Spring Boot", "MySQL"],
      ["Python", "Django", "MongoDB"],
      ["HTML", "CSS", "JavaScript"],
      ["C++", "DSA", "Git"],
      ["MERN", "Express", "Redux"],
      ["Flutter", "Firebase"],
      ["Machine Learning", "Python"],
      ["SQL", "Oracle", "Java"],
      ["Next.js", "TypeScript"]
    ];

    const studentData = [];

    for (let i = 1; i <= 40; i++) {
      studentData.push({
        fullname: `Student ${i}`,
        email: `student${i}@gmail.com`,
        phoneNumber: 9100000000 + i,
        password: hashedPassword,
        role: "student",
        profile: {
          bio: "Looking for Internship",
          skills: skills[i % skills.length],
          profilePhoto: ""
        }
      });
    }

    const students = await User.insertMany(studentData);

    console.log(`${students.length} Students Created`);

    // -----------------------------
    // Companies
    // -----------------------------
    const companyNames = [
      "Google",
      "Microsoft",
      "Amazon",
      "Adobe",
      "Oracle",
      "IBM",
      "Infosys",
      "TCS",
      "Wipro",
      "Accenture",
      "Capgemini",
      "HCL",
      "Tech Mahindra",
      "Zoho",
      "Paytm",
      "Flipkart",
      "PhonePe",
      "Swiggy",
      "Zomato",
      "Cisco"
    ];

    const locations = [
      "Noida",
      "Bengaluru",
      "Hyderabad",
      "Pune",
      "Gurugram"
    ];

    const companies = [];

    for (let i = 0; i < companyNames.length; i++) {
      const company = await Company.create({
        name: companyNames[i],
        description: `${companyNames[i]} Software Company`,
        website: `https://www.${companyNames[i]
          .toLowerCase()
          .replace(/\s/g, "")}.com`,
        location: locations[i % locations.length],
        logo: "",
        userId: recruiters[i % recruiters.length]._id
      });

      recruiters[i % recruiters.length].profile.company = company._id;
      await recruiters[i % recruiters.length].save();

      companies.push(company);
    }

    console.log(`${companies.length} Companies Created`);

    // ---------- PART 2 STARTS HERE ----------

        // -----------------------------
    // Jobs
    // -----------------------------

    const jobTitles = [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "React Developer",
      "Node.js Developer",
      "Java Developer",
      "Python Developer",
      "Software Engineer",
      "MERN Stack Developer",
      "DevOps Engineer"
    ];

    const jobDescriptions = [
      "Looking for passionate developers.",
      "Build scalable web applications.",
      "Work with modern JavaScript technologies.",
      "Develop REST APIs and frontend applications.",
      "Collaborate with senior software engineers."
    ];

    const requirementList = [
      ["HTML", "CSS", "JavaScript"],
      ["React", "Redux", "Tailwind"],
      ["Node.js", "Express", "MongoDB"],
      ["Java", "Spring Boot", "MySQL"],
      ["Python", "Django", "PostgreSQL"],
      ["Git", "GitHub", "Docker"],
      ["REST API", "JWT", "Authentication"],
      ["TypeScript", "Next.js", "Prisma"],
      ["C++", "DSA", "OOP"],
      ["AWS", "CI/CD", "Linux"]
    ];

    const jobLocations = [
      "Noida",
      "Bengaluru",
      "Hyderabad",
      "Pune",
      "Gurugram",
      "Remote"
    ];

    const jobTypes = [
      "Full Time",
      "Internship",
      "Part Time"
    ];

    const jobs = [];

    for (let i = 1; i <= 100; i++) {

      const company = companies[(i - 1) % companies.length];
      const recruiter = recruiters[(i - 1) % recruiters.length];

      const job = await Job.create({
        title: jobTitles[(i - 1) % jobTitles.length],

        description:
          jobDescriptions[(i - 1) % jobDescriptions.length],

        requirements:
          requirementList[(i - 1) % requirementList.length],

        salary: 25000 + (i * 1000),

        experienceLevel: i % 4,

        location:
          jobLocations[(i - 1) % jobLocations.length],

        jobType:
          jobTypes[(i - 1) % jobTypes.length],

        position: (i % 5) + 1,

        company: company._id,

        created_by: recruiter._id,

        applications: []
      });

      jobs.push(job);
    }

    console.log(`${jobs.length} Jobs Created`);

    // ---------- PART 3 STARTS HERE ----------

        // -----------------------------
    // Applications
    // -----------------------------

    const applicationStatus = [
      "pending",
      "accepted",
      "rejected"
    ];

    const applications = [];

    for (let i = 1; i <= 200; i++) {

      const student = students[(i - 1) % students.length];
      const job = jobs[(i - 1) % jobs.length];

      // Prevent duplicate applications
      const alreadyApplied = await Application.findOne({
        applicant: student._id,
        job: job._id
      });

      if (alreadyApplied) continue;

      const application = await Application.create({
        applicant: student._id,
        job: job._id,
        status: applicationStatus[(i - 1) % applicationStatus.length]
      });

      applications.push(application);

      // Push application into job
      job.applications.push(application._id);
      await job.save();
    }

    console.log(`${applications.length} Applications Created`);

    console.log("=================================");
    console.log("Database Seeded Successfully 🚀");
    console.log("=================================");

  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

connectDB().then(() => seedDatabase());