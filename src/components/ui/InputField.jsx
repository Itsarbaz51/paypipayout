import React from "react";

function InputField({
  name,
  inputType,
  placeholderName,
  handleChange,
  valueData,
}) {
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <input
        type={inputType}
        name={name}
        placeholder={placeholderName}
        value={valueData}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-600 border border-gray-300"
        required
      />
    </div>
  );
}

export default InputField;