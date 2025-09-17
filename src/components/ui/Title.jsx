import React from "react";
import { navbarTitleConfig } from "../../../index.js";

function Title() {
  const currentPath = location.pathname;
  const {
    title,
    tagLine,
    icon: Icon,
  } = navbarTitleConfig[currentPath] || {
    title: "",
    tagLine: "",
    icon: null,
  };
  return (
    <div className="flex items-center space-x-4">
      <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 p-2 rounded-xl shadow-lg">
        {Icon && <Icon className="h-8 w-8 text-white" />}
      </div>
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-sm text-gray-500">{tagLine}</p>
      </div>
    </div>
  );
}

export default Title;
