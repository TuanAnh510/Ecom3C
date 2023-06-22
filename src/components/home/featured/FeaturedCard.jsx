import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import imgGirl from "./images.png";
import "./FeaturedCard.css";
import imgerror from "../../images/imgerror.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const FeaturedCard = ({ data, dataCate }) => {

  const [defaultImage, setDefaultImage] = useState({});
  const settings = {
    dots: true,
    infinite: false,
    arrows: true,
    fade: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
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


  function categoryPosts(item) {
    const categoryBlog = dataCate.find((category) => category._id === item);
    if (categoryBlog)
      return categoryBlog.title;
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
    <>
      <div className="slider">
        <Slider {...settings} ref={sliderRef}>
          {data.map((item) => (
            <Link to={`blogdetail/${item.slug}`}>
              <div className="card flex flex-col">
                <div className="">
                  <img
                    src={item.imageThumbnail ? item.imageThumbnail.secure_url : imgerror}
                    alt={item.title}
                    onError={handleErrorImage}
                    style={{ height: "180px", width: "250px" }}
                  />
                </div>
                <div className="card-bottom">
                  <span className="category">{categoryPosts(item.category)}</span>
                  <h1 className="mt-5 font-bold">{item.title}</h1>

                </div>
              </div>
            </Link>
          ))}
        </Slider>
        <div>
          <span className="next cursor-pointer" onClick={gotoPrev}></span>
          <span className="prew cursor-pointer" onClick={gotoNext}></span>
        </div>
      </div>
    </>
  );
};

export default FeaturedCard;
