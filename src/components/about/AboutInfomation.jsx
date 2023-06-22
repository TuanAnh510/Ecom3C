import React from "react";
import Heading from "../../components/common/Heading";
import { team } from "../../components/data/Data";
import "./AboutInfomation.css";
import { Link } from "react-router-dom";
const Infomation = () => {
  return (
    <>
      <section className="team background">
        <div className="containers">
          {/* <Heading title="Our Featured Agents" subtitle="Ban điều hành" /> */}
          <div className="col-inner">
            <div className="row">
              <div className="col">
                <i className="fas fa-map-marker-alt text-color-card"></i>
                <span className="text-lg text-text-color">
                  300B Minh Khai, Phường Minh Khai, Quận Hai Bà Trưng, Hà Nội,
                  Việt Nam
                </span>
              </div>
              <div className="col">
                <i className="fas fa-building text-color-card"></i>
                <span className="text-lg text-text-color">Công ty cổ phần EverEV</span>
              </div>
              <div className="col">
                <i className="fas fa-id-card text-color-card"></i>
                <span className="text-lg text-text-color">
                  Mã số thuế công ty EverEV 0316709177
                </span>
              </div>
            </div>
            <p className="title-col text-color-title font-bold">Ban điều hành </p>
          </div>

          <div className="content mtop grid3">
            {team.map((val, index) => (
              <div className="box bg-color-card" key={index}>

                <div className="details">
                  <div className="img">
                    <img src={val.cover} alt="" />

                  </div>

                  <label className="text-text-color">{val.address}</label>
                  <h4 className="text-text-color py-2">{val.name}</h4>

                  <div className="">
                    <button className="btn_gmail mx-2">
                      <a className="fa fa-envelope fa-lg" href="mailto:#"></a>
                    </button>
                    <button className="btn4 mx-2">
                      <a className="fa fa-phone-alt fa-lg" href="tel:#"></a>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Infomation;
