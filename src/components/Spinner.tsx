import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-t-4 border-transparent rounded-full animate-spin-slow">
          <div className="w-full h-full border-4 border-t-4 border-transparent rounded-full bg-gradient-to-r from-pink-500 via-yellow-500 animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
