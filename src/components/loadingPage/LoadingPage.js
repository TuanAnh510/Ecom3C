import React from "react";

const LoadingPage = ({ size }) => {
  return (
    <div className="flex items-center justify-center w-full h-full p-10">
      <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
        <div
          style={{ width: `${size}px`, height: `${size}px` }}
          className="animate-spin"
        >
          <div className="h-full w-full border-4 border-t-[#007bff] border-b-[purple-dark] rounded-[50%]"></div>
        </div>
        <div>Đang tải ...</div>
      </div>
    </div>
  );
};

export default LoadingPage;
