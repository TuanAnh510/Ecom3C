import React, { useEffect, useState } from "react";
import "./Ads.css";
import { AiFillCloseCircle } from "react-icons/ai";
import imgqc from "../images/q.jpg";
import { Link } from "react-router-dom";
const Ad = () => {
  useEffect(() => {
    const modalContainer = document.querySelector(".modal-container");
    modalContainer.style.display = "block";
  }, []);

  const [isVisible, setIsVisible] = useState(true);

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  return isVisible ? (
    <div className="modal-container">
      <div className="modal-content">
        <button onClick={handleCloseModal} className="Ac_items">
          <div>
            <AiFillCloseCircle className="text-black" size="25px" />
          </div>
        </button>
        <img src={imgqc} alt="Ad" width="100%" />
      </div>
    </div>
  ) : null;
};

export default Ad;