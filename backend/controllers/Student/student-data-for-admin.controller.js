const User = require("../../models/user.model");
const Job = require("../../models/job.model");

const StudentDataYearBranchWise = async (req, res) => {
  try {
    // first year 
    const firstYearComputer = await User.find({ role: "student", "studentProfile.department": "Computer", "studentProfile.year": 1 });
    const firstYearCivil = await User.find({ role: "student", "studentProfile.department": "Civil", "studentProfile.year": 1 });
    const firstYearElectrical = await User.find({ role: "student", "studentProfile.department": "Electrical", "studentProfile.year": 1 });
    const firstYearMechanical = await User.find({ role: "student", "studentProfile.department": "Mechanical", "studentProfile.year": 1 });

    // second year 
    const secondYearComputer = await User.find({ role: "student", "studentProfile.department": "Computer", "studentProfile.year": 2 });
    const secondYearCivil = await User.find({ role: "student", "studentProfile.department": "Civil", "studentProfile.year": 2 });
    const secondYearElectrical = await User.find({ role: "student", "studentProfile.department": "Electrical", "studentProfile.year": 2 });
    const secondYearMechanical = await User.find({ role: "student", "studentProfile.department": "Mechanical", "studentProfile.year": 2 });

    // third year 
    const thirdYearComputer = await User.find({ role: "student", "studentProfile.department": "Computer", "studentProfile.year": 3 });
    const thirdYearCivil = await User.find({ role: "student", "studentProfile.department": "Civil", "studentProfile.year": 3 });
    const thirdYearElectrical = await User.find({ role: "student", "studentProfile.department": "Electrical", "studentProfile.year": 3 });
    const thirdYearMechanical = await User.find({ role: "student", "studentProfile.department": "Mechanical", "studentProfile.year": 3 });

    // fourth year 
    const fourthYearComputer = await User.find({ role: "student", "studentProfile.department": "Computer", "studentProfile.year": 4 });
    const fourthYearCivil = await User.find({ role: "student", "studentProfile.department": "Civil", "studentProfile.year": 4 });
    const fourthYearElectrical = await User.find({ role: "student", "studentProfile.department": "Electrical", "studentProfile.year": 4 });
    const fourthYearMechanical = await User.find({ role: "student", "studentProfile.department": "Mechanical", "studentProfile.year": 4 });

    return res.json({
      firstYearComputer, firstYearCivil, firstYearElectrical, firstYearMechanical,
      secondYearComputer, secondYearCivil, secondYearElectrical, secondYearMechanical,
      thirdYearComputer, thirdYearCivil, thirdYearElectrical, thirdYearMechanical,
      fourthYearComputer, fourthYearCivil, fourthYearElectrical, fourthYearMechanical
    });
  } catch (error) {
    console.log("student-data-for-admin.controller.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}

const NotifyStudentStatus = async (req, res) => {
  try {
    const filteredStudents = await User.find({
      role: 'student',
      'studentProfile.appliedJobs.status': { $in: ['interview', 'hired'] }
    })
      .select('_id first_name last_name studentProfile.year studentProfile.department studentProfile.appliedJobs')
      .lean();

    const studentsWithJobDetails = [];

    for (const student of filteredStudents) {
      const appliedJobs = student.studentProfile.appliedJobs.filter(job => ['interview', 'hired'].includes(job.status));

      const jobDetails = await Job.find({
        _id: { $in: appliedJobs.map(job => job.jobId) }
      })
        .populate('company', 'companyName')
        .select('company jobTitle _id')
        .lean();

      const jobsWithDetails = appliedJobs.map(job => {
        const jobDetail = jobDetails.find(jd => String(jd._id) === String(job.jobId));
        return {
          status: job.status,
          companyName: jobDetail?.company?.companyName || 'Unknown Company',
          jobId: jobDetail?._id || 'Unknown JobId',
          jobTitle: jobDetail?.jobTitle || 'Unknown Job Title'
        };
      });

      studentsWithJobDetails.push({
        _id: student._id,
        name: `${student.first_name} ${student.last_name}`,
        year: student.studentProfile.year,
        department: student.studentProfile.department,
        jobs: jobsWithDetails
      });
    }

    return res.status(200).json({ studentsWithJobDetails });
  } catch (error) {
    console.log("student-data-for-admin.controller.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}

module.exports = {
  StudentDataYearBranchWise,
  NotifyStudentStatus
};
