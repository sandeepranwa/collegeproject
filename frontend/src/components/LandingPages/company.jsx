import React from "react";
import { motion } from "framer-motion";

const companies = [
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    title: "Google",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    title: "Microsoft",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    title: "Amazon",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    title: "Facebook",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    title: "Apple",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Oracle_logo.svg",
    title: "Oracle",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/0/08/TCS_Logo.svg",
    title: "TCS",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Infosys_logo.svg",
    title: "Infosys",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Wipro_Primary_Logo_Color_RGB.svg",
    title: "Wipro",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Cognizant_logo_2022.svg",
    title: "Cognizant",
  },
];

function CompanyCarousel() {
  return (
    <div className="company-section py-4 bg-light">
      <h2 className="text-center text-primary fw-bold mb-3">
        Our Recruiting Companies
      </h2>

      {/* Fixed Width Container to Avoid Layout Break */}
      <div
        className="company-label-container overflow-hidden position-relative mx-auto"
        style={{ maxWidth: "80vw" }}
      >
        <motion.div
          className="d-flex align-items-center gap-4 company-slider"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          style={{ whiteSpace: "nowrap" }}
        >
          {[...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="company-card text-center p-3 rounded shadow-sm"
              style={{
                minWidth: "180px",
                background: "#ffffff",
                borderRadius: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={company.img}
                alt={company.title}
                className="img-fluid"
                style={{ width: "100px", height: "50px", objectFit: "contain" }}
              />
              <h6 className="mt-2 fw-bold text-dark">{company.title}</h6>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default CompanyCarousel;
