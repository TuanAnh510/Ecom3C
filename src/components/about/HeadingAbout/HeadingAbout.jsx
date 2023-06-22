import React from "react";

const HeadingAbout = ({ title, subtitle }) => {
  return (
    <>
      <div className="headingAbout">
        <h1 className="text-color-title py-4">{title}</h1>
        <p>{subtitle}</p>
      </div>
    </>
  );
};

export default HeadingAbout;
