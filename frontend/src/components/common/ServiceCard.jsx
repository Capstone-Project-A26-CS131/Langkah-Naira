import React from "react";
import { ArrowRight } from "lucide-react";

export default function ServiceCard({ icon, title, text, onClick, tone }) {
  return (
    <button className={`service-card ${tone}`} onClick={onClick}>
      <div className="service-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      <span className="card-arrow"><ArrowRight size={16} /></span>
    </button>
  );
}
