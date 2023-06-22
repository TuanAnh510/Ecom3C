import React, { useState, useEffect } from "react";
import Back from "../common/Back";
import HeadingAbout from "./HeadingAbout/HeadingAbout";
import img from "../images/Panel.jpg";
import axios from "axios";
import imgAb from "../images/imgAb_1.png";
import "./about.css";
import SimpleSlider from "./SliderImage";
import Infomation from "./AboutInfomation";
import Sliderimg from "./Slide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-toastify";
import LoadingPage from "../loadingPage/LoadingPage";
const About = () => {
  const [showText, setShowText] = useState(false);
  const [showTexFirst, setShowTextFirst] = useState(false);
  const [showTexSecond, setShowTextSecond] = useState(false);
  const [dataABS, setDataABS] = useState([]);
  const handleClick = () => {
    setShowText(!showText);
  };
  const handleClickFirst = () => {
    showTexFirst(!setShowTextFirst);
  };
  const handleClickLast = () => {
    showTexSecond(!setShowTextSecond);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}about-us/`)
      .then((response) => {
        setDataABS(response.data);
      })
      .catch((error) => toast.error("Đã xảy ra lỗi"));
  }, []);

  return dataABS != undefined ? (
    <>
      {dataABS.map((item) => (
        <section className="about">
          <Back cover={item.imgheader.secure_url} />
          <div className="HeadingA ">
            <HeadingAbout title="Chúng tôi là ai" />
          </div>
          <div className="containers flexs ">
            <div class="image-container py-2">
              <img src={item.imgwhoarewe.secure_url} />
            </div>
            <div className="text-container text-text-color bg-color-card break-words overflow-y-hidden shadow">
              <p className="mt-10 ml-5 mr-5 lg-text-[15px] ">
                {item.descriptionwhoarewe}
              </p>
            </div>
          </div>
          <div className="HeadingA_2">
            <HeadingAbout title="Câu chuyện khởi nghiệp" />
          </div>

          <div className="containers flexs mtop">
            <div
              className="text-container text-text-color bg-color-card break-words overflow-y-scroll shadow"
              style={{ height: "480px" }}
            >
              <div className="about_diveder"></div>

              <div className="btn_show">
                <div
                  className="toggle-button-container"
                  style={{ display: "inline-flex" }}
                >
                  <p
                    className="toggle-button"
                    onClick={() => setShowText(!showText)}
                    style={{ flexDirection: "row-reverse" }}
                  >
                    {showText ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-chevron-up"
                      >
                        <path d="M18 15l-6-6-6 6" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-chevron-down"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    )}
                  </p>
                </div>
                <p>
                  <span className="arrow">
                    {item.descriptionstartupstory1.slice(0, 215)}...
                  </span>
                </p>
              </div>
              {showText && (
                <div className="div_show">
                  <span className="text_show">
                    {item.descriptionstartupstory1.slice(215)}
                  </span>
                </div>
              )}

              <div className="about_diveder"></div>

              <div className="btn_showFirst">
                <div
                  className="toggle-button-container"
                  style={{ display: "inline-flex" }}
                >
                  <p
                    className="toggle-button"
                    onClick={() => setShowTextFirst(!showTexFirst)}
                    style={{ flexDirection: "row-reverse" }}
                  >
                    {showTexFirst ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-chevron-up"
                      >
                        <path d="M18 15l-6-6-6 6" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-chevron-down"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    )}
                  </p>
                </div>
                <p>
                  <span className="arrow">
                    {item.descriptionstartupstory2.slice(0, 143)}...
                  </span>
                </p>
              </div>
              {showTexFirst && (
                <div className="div_show">
                  <span className="text_show">
                    {item.descriptionstartupstory2.slice(143)}
                  </span>
                </div>
              )}

              <div className="about_diveder"></div>

              <div className="btn_showFirst">
                <div
                  className="toggle-button-container"
                  style={{ display: "inline-flex" }}
                >
                  <p
                    className="toggle-button"
                    onClick={() => setShowTextSecond(!showTexSecond)}
                    style={{ flexDirection: "row-reverse" }}
                  >
                    {showTexSecond ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-chevron-up"
                      >
                        <path d="M18 15l-6-6-6 6" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-chevron-down"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    )}
                  </p>
                </div>
                <p>
                  <span className="arrow">
                    {item.descriptionstartupstory3.slice(0, 143)}...
                  </span>
                </p>
              </div>
              {showTexSecond && (
                <div className="div_show">
                  <span className="text_show">
                    {item.descriptionstartupstory3.slice(143)}...
                  </span>
                </div>
              )}
            </div>
            <div className="image-container">
              <img src={item.imgstartupstory1.secure_url} />
              <div className="image-container-two">
                <img src={item.imgstartupstory2.secure_url} />
              </div>
            </div>
          </div>
        </section>
      ))}

      <div className="slider">
        <SimpleSlider datas={dataABS} />
      </div>
      {/* <div className="HeadingA_3">
        <HeadingAbout title="Thông tin về công ty" />
      </div> */}
      {/* <div>
        <Infomation />
      </div> */}
      <div className="py-[50px]">
        <HeadingAbout title="Đối tác chiến lược" />
        <div className="About_slide">
          <Sliderimg />
        </div>
      </div>
    </>
  ) : (
    <LoadingPage size={32} />
  );
};

export default About;
