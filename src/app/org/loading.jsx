import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex justify-center-safe items-center-safe">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 border-6 border-btn-100/20 border-t-btn-100 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
