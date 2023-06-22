import React from "react";
import "./hero.css";
import { Link } from "react-router-dom";
const Hero = ({ imgheader, titleheader }) => {
  return (
    <>
      <section className=" flex text-center flex-col justify-center  bg-slate-500 h-[500px]">
        <div
          className="hero relative"
          style={{ backgroundImage: "url(" + imgheader + ")" }}
        ></div>
        <div className="absolute flex flex-col sm:w-[50%] md:w-[40%]  xl:w-[40%] justify-center text-start left-[5%] top-[25%]">
          <h1 className="text-white text-[33px] md:text-[30px] lg:text-[43px] font-bold">
            {titleheader}
          </h1>
          {/* <div className="mt-4">
            <button className="btn-watch">
              <i className="fa-solid fa-play"></i>
            </button>
          </div> */}
          <div className="gap-2 flex mt-4">
            <Link to={"/services"}>
              {" "}
              <button className="btn-nobg">Tìm hiểu thêm</button>
            </Link>
            <Link to={"/contact"}>
              <button className="bg-color-button">Liên hệ ngay</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
