import React from "react";
import "./Heading.css";

const Heading = ({ title }) => {
  return (
    <>
      <div className="Blog_heading ">
        <h6 className="bg-color-basic text-text-color">{title}</h6>
      </div>
    </>
  );
};

export default Heading;
