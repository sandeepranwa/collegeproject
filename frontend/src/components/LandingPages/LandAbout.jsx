import React from "react";
import { motion } from "framer-motion";
import img from '../../assets/biet.jpg';

const AboutUs = () => {
  return (
    <section id="about" className="bg-light py-6 mt-5">
      <div className="container">
        {/* About Us - Centered Heading */}
        <motion.h1 
          className="text-danger text-uppercase fw-bold text-center mb-2"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          About Us
        </motion.h1>

        <div className="row align-items-center">
          {/* Left Side - Image */}
          <motion.div 
            className="col-md-5 text-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src={img}
              alt="Bhartiya Institute of Engineering & Technology"
              className="img-fluid rounded shadow-lg"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </motion.div>

          {/* Right Side - College Details & Text */}
          <motion.div 
            className="col-md-7 text-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="fw-bold text-primary text-center mt-3">
              Bhartiya Institute Of <br /> Engineering & Technology
            </h2>
            
            <p style={{ textAlign: "justify" }}>
              Bhartiya Institute of Engineering & Technology (BIET) has been established by 
              BPS Shikshan Sansthan Samiti, Sikar, an educational society devoted to the 
              noble cause of spreading quality education in the region. The college is 
              affiliated with Bikaner Technical University, Bikaner and approved by AICTE & 
              Ministry of HRD, New Delhi.
            </p>
            <p style={{ textAlign: "justify" }}>
              BIET is committed to fostering excellence in students, offering B.Tech courses 
              in Civil, Mechanical, Electrical, and Computer Science streams.
            </p>

            {/* Information Boxes - Similar to "Our Recruiting Companies" */}
            <div className="d-flex justify-content-center gap-4 mt-4">
              <div className="p-3 text-center rounded-3 shadow-sm bg-white" style={{ width: "45%" }}>
                <h6 className="fw-bold text-danger mb-1">16+ Years Of</h6>
                <p className="text-muted mb-0" style={{ fontSize: "15px" }}>Education Experience</p>
              </div>
              <div className="p-3 text-center rounded-3 shadow-sm bg-white" style={{ width: "45%" }}>
                <h6 className="fw-bold text-primary mb-1">Mr. Hariram Ranwa</h6>
                <p className="text-muted mb-0" style={{ fontSize: "15px" }}>Chairman and Founder</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
