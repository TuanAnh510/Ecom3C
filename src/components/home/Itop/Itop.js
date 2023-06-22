import ScrollToTop from "react-scroll-to-top";
import React, { useState, useEffect } from "react";
import "./Itop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faComment } from "@fortawesome/free-solid-svg-icons";
import logozalo from "./zalo-logo.png";
import phone from "./calling.png";
import axios from "axios";

const Itop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const getInfoweb = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}info/`)
        .then((response) => {
          setInfo(response.data);
        });
    };
    getInfoweb();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return info.length != 0 ? (
    <>
      <div className="chat-buttons">
        <ul>
          <li>
            <a href={`https://zalo.me/${info[0].zalo}`}>
              <img
                src={logozalo}
                alt="Zalo chat icon"
                className="iconZalo"
              />
            </a>
          </li>
          <li>
            <a href={`tel:+${info[0].hotline}`}>
              <img
                src={phone}
                alt="Phone icon"
                className="iconPhone"
              />
            </a>
          </li>
        </ul>
      </div>
      {/* <ScrollToTop component={CustomScrollToTopArrow} smooth /> */}
      <div className="scrollButton">
        {isVisible && (
          <button onClick={scrollToTop}>
            <i className="fa fa-chevron-up"></i>
          </button>
        )}
      </div>
    </>
  ) : (
    <></>
  );
};

export default Itop;
