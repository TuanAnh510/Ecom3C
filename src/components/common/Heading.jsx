import React from "react";

const Heading = ({ title, subtitle }) => {
  return (
    <>
      <div className="flex justify-center flex-col text-center text-[#6698FF] gap-3 ">
        <h2 className="text-[38px] font-bold">{title}</h2>
        <p className="text-[black] text-xl  ">{subtitle}</p>
      </div>
    </>
  );
};

export default Heading;
