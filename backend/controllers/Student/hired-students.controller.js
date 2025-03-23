const User = require("../../models/user.model");
const Job = require("../../models/job.model");
const Company = require("../../models/company.model"); // ✅ Added Company Model

const getHiredStudents = async (req, res) => {
    try {
        const hiredStudents = await User.find({
            "role": "student",
            "studentProfile.appliedJobs.status": "hired"
        })
            .populate({
                path: "studentProfile.appliedJobs.jobId",
                model: "Job",
                select: "jobTitle salary company",
                populate: {
                    path: "company",
                    model: "Company",
                    select: "companyName"
                }
            })
            .select("first_name last_name profile studentProfile.department studentProfile.year studentProfile.appliedJobs")
            .lean();

        if (!hiredStudents.length) {
            return res.status(404).json({ msg: "No hired students found!" });
        }

        // ✅ Data ko proper format me convert karna
        const formattedHiredStudents = hiredStudents.flatMap(student =>
            student.studentProfile.appliedJobs
                .filter(job => job.status === "hired" && job.jobId) // ✅ Only "hired" jobs
                .map(job => ({
                    name: `${student.first_name} ${student.last_name}`, // ✅ Fixed Template String
                    profileImage: student.profile || "/profileImgs/default/defaultProfileImg.jpg",
                    branch: student.studentProfile.department,
                    year: student.studentProfile.year,
                    company: job.jobId.company?.companyName || "N/A",
                    jobTitle: job.jobId.jobTitle,
                    ctc: job.jobId.salary
                }))
        );

        return res.status(200).json(formattedHiredStudents);
    } catch (error) {
        console.error("Error in getHiredStudents:", error);
        return res.status(500).json({ msg: "Internal Server Error!" });
    }
};

module.exports = { getHiredStudents };
