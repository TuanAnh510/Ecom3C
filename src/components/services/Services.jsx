import React, { useEffect, useState } from "react";
import img from "../images/sacdien.jpg";
import Back from "../common/Back";
import "../home/featured/Featured.css";
import img2 from "../images/linkkien.jpg";
import img3 from "../images/tramsac.jpg";
import "./Services.css";
import axios from "axios";
import imgerror from "../images/imgerror.png";
import { toast } from "react-toastify";

const Services = () => {
  const [data, setData] = useState([]);
  const [dataCate, setDataCate] = useState([]);
  const [imgeHeader, setimgeHeader] = useState("");
  const [titleH, settitleH] = useState("");
  const [title1, settitle1] = useState("");
  const [imageTitle, setimageTitle] = useState("");
  const [imgbody2, setimgbody2] = useState("");
  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URL}blog/`).then((response) => {
      const blog = response.data;
      if (blog) setData(blog);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}company-service/`)
      .then((response) => {
        setimgeHeader(response.data[0].imgheader.secure_url);
        settitleH(response.data[0].titleheader);
        settitle1(response.data[0].titlebody1);
        setimageTitle(response.data[0].imgbody1.secure_url);
        setimgbody2(response.data[0].imgbody2.secure_url);
      })
      .catch((error) => toast.error("Đã xảy ra lỗi"));
  }, []);

  return (
    <>
      <section className="services mb ">
        <Back name="Dịch vụ" title={titleH} cover={imgeHeader} />
        <div className="containers mx-auto sm:px-4 justify-items-center">
          <div className="flex flex-wrap justify-items-center justify-center items-center">
            <div className="relative  sm:flex-1.5 sm:w-[400px] py-4">
              <img
                className="lg:h-[600px] lg:w-[800px] sm:h-[500px] rounded-[20px]"
                src={imageTitle}
                alt="linh kien"
              />
            </div>
            <div className="flex justify-center items-center sm:flex-grow sm:flex-1 w-[300px] sm:h-[350px] mx-auto sm:ml-[30px] overflow-y-hidden shadow bg-color-card rounded-lg">
              <div className="p-4 ">
                {/* <h2 className="tieude font-bold lg:text-[30px] text-[24px] text-color-title">
                  Một hệ thống sạc cần đảm bảo sạc nhanh, sạc an toàn và luôn
                  sẵn sàng
                </h2> */}
                <br />
                <p className="text-text-color text-[1.4rem] lg:text-justify text-justify ">
                  {title1}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="imgdai">
          <Back cover={imgbody2} />
        </div>
        <div className="containers text-center pt-[20px]">
          <h3 className="text-[24px] pb-[20px] text-text-title">
            Dịch vụ vận hành và bảo hành
          </h3>
          <div className="flex flex-wrap justify-between">
            {data
              .map((val) => (
                <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0 ">
                  <div className="relative h-0 pb-[100%] mb-4">
                    <img
                      src={
                        val.imageThumbnail
                          ? val.imageThumbnail.secure_url
                          : imgerror
                      }
                      alt="Item 3"
                      className="absolute inset-0 w-full h-full object-cover rounded-[20px] shadow"
                    />
                  </div>
                  <p className="text-text-color leading-relaxed text-center mt-4">
                    {val.title}
                  </p>
                </div>
              ))
              .slice(-3)}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
