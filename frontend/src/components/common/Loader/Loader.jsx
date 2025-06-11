// src/components/Loader.jsx
import React from "react";
import "./Loader.css"; // Custom styles since this animation can't be fully replicated with Tailwind

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center">
      <div className="spinner">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loader;
