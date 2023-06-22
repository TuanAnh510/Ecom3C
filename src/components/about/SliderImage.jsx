import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./Slider.css";
const Example = ({ datas }) => {
  const Arrow = ({ direction, clickFunction, glyph }) => (
    <div className={`slide-arrow ${direction}`} onClick={clickFunction}>
      {glyph}
    </div>
  );
  const images = [
    "https://everev.vn/wp-content/uploads/2022/11/de4bc02058319e6fc720.jpg",
    "https://everev.vn/wp-content/uploads/2022/11/a519bd762567e339ba76-1-1.jpg",
    "https://everev.vn/wp-content/uploads/2022/11/fd738d1fb90f7f51261e-1-1.jpg",
  ];
  const properties = {
    duration: 4000,
    transitionDuration: 1000,
    infinite: true,
    indicators: true,
    prevArrow: <Arrow direction="prev" />,
    nextArrow: <Arrow direction="next" />,
    arrows: true,
    pauseOnHover: true,
  };
  return (
    <div className="slide-container">
      {datas.map((item) => (
        <Slide {...properties}>
          <div className="each-slide-effect">
            <div
              style={{ backgroundImage: `url(${item.imgslide1.secure_url})` }}
            >
              <span>
                <strong>Chất lượng: </strong> {item.chatluong}
                <br />
                <strong>Chuyên nghiệp: </strong> {item.chuyennghiep}
                <br />
                <strong>Tiên phong: </strong> {item.tienphong}
              </span>
            </div>
          </div>
          <div className="each-slide-effect">
            <div
              style={{ backgroundImage: `url(${item.imgslide2.secure_url})` }}
            >
              <span>
                <strong>Tầm nhìn</strong>: {item.tamnhin}
              </span>
            </div>
          </div>
          <div className="each-slide-effect">
            <div
              style={{ backgroundImage: `url(${item.imgslide3.secure_url})` }}
            >
              <span>
                <strong>Sứ mệnh:</strong> {item.sumang}
              </span>
            </div>
          </div>
        </Slide>
      ))}
    </div>
  );
};

export default Example;
