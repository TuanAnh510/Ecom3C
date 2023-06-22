import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import imgGirl from "./images.png";
import { dataDigitalBestSeller } from "./data";
import "./recent.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const SliderRecent = ({ title, des,product }) => {
  const [defaultImage, setDefaultImage] = useState({});
 
  const settings = {
    dots: true,
    infinite: false,
    arrows: false,
    fade: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  const handleErrorImage = (data) => {
    setDefaultImage((prev) => ({
      ...prev,
      [data.target.alt]: data.target.alt,
      linkDefault: imgGirl,
    }));
  };
  const sliderRef = useRef();
  const gotoNext = () => {
    sliderRef.current.slickNext();
  };
  const gotoPrev = () => {
    sliderRef.current.slickPrev();
  };
  return (
    <div className="mt-10">
      <div className="slider-title pt-5 pb-5 text-center bg-color-button flex justify-center">
        <span className="text-2xl text-center font-bold text-white">
          {" "}
          <i className="fa fa-angle-down" aria-hidden="true"></i> {title}
        </span>
        <div className="brick"></div>
      </div>
      <div className="text-center p-5">{des}</div>
      <div className="slider bg-white">
        <Slider {...settings} ref={sliderRef}>
          {dataDigitalBestSeller.map((item) => (
            <div className="card">
              <div className="card-top">
                <img
                  className="object-cover"
                  src={
                    defaultImage[item.title] === item.title
                      ? defaultImage.linkDefault
                      : item.linkImg
                  }
                  alt={item.title}
                  onError={handleErrorImage}
                />
              </div>{" "}
              <div className="card-bottom flex flex-col items-start justify-center">
                <span className="category text-3xl">{item.category}</span>
                <h4 className="mt-5">{item.title}</h4>
                <span className="category">{item.des}</span>
                <h4 className="mt-4">Danh mục : {item.category}</h4>
                <button className="mt-3">Đọc tiếp</button>
              </div>
            </div>
          ))}
        </Slider>
        <div>
          <span className="next cursor-pointer" onClick={gotoPrev}></span>
          <span className="prew cursor-pointer" onClick={gotoNext}></span>
        </div>
      </div>
    </div>
  );
};

export default SliderRecent;
