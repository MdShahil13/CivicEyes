import React from "react";

const Button = ({ text, type = "button", className = "", onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full px-5 py-3 font-semibold rounded-xl transition ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;