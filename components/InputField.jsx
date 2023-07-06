import React  from "react";

const InputField = ({ value, label, name, placeholder, type, onChange }) => (
  <div className="form-group">
    {label && <label htmlFor="input-field">{label}</label>}
    <input
      type={type}
      value={value}
      name={name}
      className="mt-8 border rounded p-4"
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

export default InputField;