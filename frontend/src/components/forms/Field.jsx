export default function Field({ label, children, required = false }) {
  return (
    <label className="grid min-w-0 self-start gap-2 text-sm font-semibold text-slate-600">
      <span>{label}{required && <b className="text-rose-400"> *</b>}</span>
      {children}
    </label>
  );
}
import React from "react";
