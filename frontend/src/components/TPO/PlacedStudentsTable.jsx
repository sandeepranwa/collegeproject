import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/config";

function PlacedStudentsTable() {
  document.title = "BIET | Placed Students";

  const [placedStudents, setPlacedStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [year, setYear] = useState("");

  // 🔹 Branch Options
  const branches = ["All", "Computer", "Civil", "Electrical", "Mechanical"];

  useEffect(() => {
    const fetchHiredStudents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        // ✅ API Call to Fetch Hired Students
        const response = await axios.get(`${BASE_URL}/student/hired`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data); // Debugging

        setPlacedStudents(response.data);
        setFilteredStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHiredStudents();
  }, []);

  // 🔹 Filter Function
  const handleFilter = () => {
    let filteredData = placedStudents;

    if (selectedBranch && selectedBranch !== "All") {
      filteredData = filteredData.filter((student) => student.branch === selectedBranch);
    }

    if (year) {
      filteredData = filteredData.filter((student) => student.year.toString() === year);
    }

    setFilteredStudents(filteredData);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Placed Students</h2>

      {/* 🔹 Filter Section */}
      <div className="mb-4 flex justify-center gap-4">
        {/* 🔹 Branch Dropdown */}
        <select
          className="border p-2 rounded-lg"
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
        >
          {branches.map((branch, index) => (
            <option key={index} value={branch}>
              {branch}
            </option>
          ))}
        </select>

        {/* 🔹 Year Input */}
        <input
          type="number"
          placeholder="Enter Year (e.g., 2024)"
          className="border p-2 rounded-lg"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        {/* 🔹 Filter Button */}
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Filter
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="border border-gray-300 p-2">S. No.</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Branch</th>
                <th className="border border-gray-300 p-2">Year</th>
                <th className="border border-gray-300 p-2">CTC</th>
                <th className="border border-gray-300 p-2">Company</th>
                <th className="border border-gray-300 p-2">Job Title</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2">{student.name}</td>
                    <td className="border border-gray-300 p-2">{student.branch}</td>
                    <td className="border border-gray-300 p-2">{student.year}</td>
                    <td className="border border-gray-300 p-2">{student.ctc} LPA</td>
                    <td className="border border-gray-300 p-2">{student.company}</td>
                    <td className="border border-gray-300 p-2">{student.jobTitle}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-4 text-gray-500 text-center">
                    No placed students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PlacedStudentsTable;
 