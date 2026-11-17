export default function Field({ label, children, required = false }) {
  return (
    <label className="field">
      <span>{label}{required && <b> *</b>}</span>
      {children}
    </label>
  );
}
import React from "react";
