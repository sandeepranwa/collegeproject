import React, { useState } from "react";
import { motion } from "framer-motion";

const students = [
  { name: "Amit Sharma", company: "Google", ctc: "20", batch: "2024", image: "https://randomuser.me/api/portraits/men/1.jpg" },
  { name: "Riya Verma", company: "Microsoft", ctc: "18", batch: "2023", image: "https://randomuser.me/api/portraits/women/2.jpg" },
  { name: "Rajesh Kumar", company: "Amazon", ctc: "22", batch: "2024", image: "https://randomuser.me/api/portraits/men/3.jpg" },
  { name: "Priya Singh", company: "TCS", ctc: "10", batch: "2022", image: "https://randomuser.me/api/portraits/women/4.jpg" },
  { name: "Vikas Yadav", company: "Infosys", ctc: "12", batch: "2023", image: "https://randomuser.me/api/portraits/men/5.jpg" },
  { name: "Anjali Patel", company: "Wipro", ctc: "15", batch: "2022", image: "https://randomuser.me/api/portraits/women/6.jpg" },
  { name: "Riya Verma", company: "Microsoft", ctc: "18", batch: "2023", image: "https://randomuser.me/api/portraits/women/2.jpg" },
  { name: "Rajesh Kumar", company: "Amazon", ctc: "22", batch: "2024", image: "https://randomuser.me/api/portraits/men/3.jpg" },
  { name: "Priya Singh", company: "TCS", ctc: "10", batch: "2022", image: "https://randomuser.me/api/portraits/women/4.jpg" },
  { name: "Vikas Yadav", company: "Infosys", ctc: "12", batch: "2023", image: "https://randomuser.me/api/portraits/men/5.jpg" },
];

function PlacedStudents() {
  const [showModal, setShowModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedCTC, setSelectedCTC] = useState("");

  // Filter Logic
  const filteredStudents = students.filter((student) => {
    return (
      (selectedBatch ? student.batch === selectedBatch : true) &&
      (selectedCTC ? student.ctc >= selectedCTC.split("-")[0] && student.ctc <= selectedCTC.split("-")[1] : true)
    );
  });

  return (
    // <div className="placed-section py-3 bg-light">
    <div className=" container mt-5">
      <h2 className="text-center fw-bold text-primary mb-4">Our Placed Students</h2>
      
      <div className="d-flex justify-content-center gap-3 flex-nowrap overflow-auto p-3">
        {students.slice(0, 5).map((student, index) => (  // Showing only 5 students initially
          <motion.div 
            key={index} 
            className="card border-0 shadow-sm rounded-3 position-relative"
            style={{ width: "180px", background: "#f8f9fa" }}
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src={student.image} 
              alt={student.name} 
              className="card-img-top rounded-top-3" 
              style={{ height: "120px", objectFit: "cover" }}
            />
            <div className="card-body text-center p-2">
              <h6 className="fw-bold text-dark mb-1">{student.name}</h6>
              <p className="text-muted mb-1" style={{ fontSize: "12px" }}>{student.company}</p>
              <p className="fw-bold text-primary mb-1" style={{ fontSize: "12px" }}>{student.ctc} LPA</p>
              <p className="text-muted mb-0" style={{ fontSize: "10px" }}>Batch: {student.batch}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View More Button - Positioned Right */}
      <div className="d-flex justify-content-end mt-3">
        <motion.button 
          className="btn btn-primary px-3 py-1 rounded-pill shadow-sm fw-bold"
          style={{ fontSize: "14px" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
        >
          View More
        </motion.button>
      </div>

      {/* Modal Component */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content p-4">
            <h3 className="text-center text-primary fw-bold">All Placed Students</h3>
            
            {/* Filters */}
            <div className="d-flex gap-3 justify-content-center my-3">
              <select 
                className="form-select w-auto"
                value={selectedBatch} 
                onChange={(e) => setSelectedBatch(e.target.value)}
              >
                <option value="">Filter by Batch</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>

              <select 
                className="form-select w-auto"
                value={selectedCTC} 
                onChange={(e) => setSelectedCTC(e.target.value)}
              >
                <option value="">Filter by CTC</option>
                <option value="10-15">10-15 LPA</option>
                <option value="15-20">15-20 LPA</option>
                <option value="20-25">20-25 LPA</option>
              </select>
            </div>

            {/* Student Grid */}
            <div className="row">
              {filteredStudents.map((student, index) => (
                <div key={index} className="col-md-4 mb-3">
                  <motion.div 
                    className="card border-0 shadow-sm rounded-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img 
                      src={student.image} 
                      alt={student.name} 
                      className="card-img-top rounded-top-3" 
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                    <div className="card-body text-center p-2">
                      <h6 className="fw-bold text-dark mb-1">{student.name}</h6>
                      <p className="text-muted mb-1">{student.company}</p>
                      <p className="fw-bold text-primary mb-1">{student.ctc} LPA</p>
                      <p className="text-muted mb-0">Batch: {student.batch}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Close Button */}
            <div className="text-center mt-3">
              <motion.button 
                className="btn btn-danger px-3 py-1 rounded-pill fw-bold"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(false)}
              >
                Close
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Styles */}
      <style>
        {`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }

          .modal-content {
            background: white;
            border-radius: 10px;
            width: 80%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </div>
    // </div>
  );
}

export default PlacedStudents;
