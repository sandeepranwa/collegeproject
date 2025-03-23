import React from "react";
import { FaBook, FaClipboardList, FaChartBar, FaBrain } from "react-icons/fa";

const stats = [
  {
    icon: <FaBook size={40} className="text-purple-600" />, 
    title: "500+ courses", 
    description: "Crafted for Placement readiness"
  },
  {
    icon: <FaClipboardList size={40} className="text-purple-600" />, 
    title: "2500+ assessments", 
    description: "Industry level mock and daily practice"
  },
  {
    icon: <FaChartBar size={40} className="text-purple-600" />, 
    title: "Unified reporting", 
    description: "Placement insights in one dashboard"
  },
  {
    icon: <FaBrain size={40} className="text-purple-600" />, 
    title: "AI-Driven technology", 
    description: "AI to boost placement success"
  },
];

function StatsSection() {
  return (
    <div className="row mt-5">
      {stats.map((stat, index) => (
        <div key={index} className="col-md-3 text-center">
          <div className="bg-light p-4 rounded shadow-sm">
            {stat.icon}
            <h5 className="mt-3 fw-bold text-primary">{stat.title}</h5>
            <p className="text-muted">{stat.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsSection;