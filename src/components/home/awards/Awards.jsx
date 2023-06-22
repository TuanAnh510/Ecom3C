import React from "react";
import { Link } from "react-router-dom";
import Heading from "../../common/Heading";
import "./awards.css";

const Awards = ({ titleservice, descriptionservice, imgservice }) => {
  return (
    <>
      <div className="relative awards">
        <img
          src={imgservice}
          alt=""
        />
        <div className="awards-title absolute md:top-[30%] ">
          <Heading
            title={titleservice}
            subtitle={descriptionservice}
          />
          <Link to={"/services"}><button className="mt-5 bg-color-button">Tìm hiểu thêm</button></Link>
        </div>{" "}
      </div>
    </>
  );
};

export default Awards;
