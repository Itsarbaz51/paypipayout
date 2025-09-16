import React from "react";

function ButtonField({ isOpen, name, icon: Icon, type, isDisabled, btncss }) {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`${btncss} bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
      onClick={isOpen}
    >
      {/* Icon sirf tab dikhe jab pass ho */}
      {Icon && <Icon className="w-4 h-4" />}
      {name}
    </button>
  );
}

export default ButtonField;
