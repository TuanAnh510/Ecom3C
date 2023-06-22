import React, { useEffect, useState } from "react";
import "./Footer.css";
import {Link} from "react-router-dom";
import axios from "axios";
const Footer = () => {
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

  return info.length != 0 ? (
    <>
      <div className="bg-color-card w-100% h-0.5"></div>
      <footer>
        <div className="bg-color-footer p-3">
          <div className="footer-content grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="company-info md:mr-8 text-center">
              <div className="w-[80px] h-[80px] ml-auto mr-auto sm:w-[250px] sm:h-[250px] md:w-[100px] md:h-[100px] xl:w-[150px] xl:h-[150px]">
                <Link to="/">
                <img src={info[0].logo.secure_url} alt="" />
                </Link>
              </div>

              <span>{info[0].slogan}</span>
            </div>
            <div className="contact-info ">
              <h3 className="text-color-title text-2xl font-bold text-center">
                Liên hệ
              </h3>
              <div className="text-text-color">
                <p>
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  Địa chỉ liên hệ: {info[0].address}
                </p>
                <a href="tel:#" className="text-text-color ">
                  <i className="fas fa-phone-alt fa-rotate-90 fa-xs mr-2"></i>
                  Điện thoại: {info[0].hotline}
                </a>
              </div>
            </div>
            <div className="address-info text-center">
              <h3 className="text-color-title text-2xl font-bold">Địa chỉ</h3>
              <div dangerouslySetInnerHTML={info[0].i}></div>
              <iframe
                title="EverEV Map"
                className="w-[250px] h-[100px] sm:w-[150px] sm:h-[100px] md:w-[200px] md:h-[130px] xl:w-[400px] xl:h-[180px] mr-auto ml-auto"
                src={info[0].iframeggmap}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                width="500"
                height="250"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="bg-color-title w-100% h-0.5"></div>
        <div className="p-3 bg-color-title">
          <p className="text-center text-text-cl font-bold">
            &copy; {info[0].nameweb}
          </p>
        </div>
      </footer>
    </>
  ) : (
    <></>
  );
};

export default Footer;
