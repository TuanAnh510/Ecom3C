import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css";
import Marquee from "react-fast-marquee";
export default class Sliderimg extends Component {
  render() {
    return (
      <div>
        <Marquee behavior="scroll" direction="left" speed={90}>
          <div>
            <img
              src="https://everev.vn/wp-content/uploads/2022/11/z3884527757493_dac0e58caf7504da7a18a3baf02ad7fa-300x113.png"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://everev.vn/wp-content/uploads/2022/11/ezgif-300x110.png"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://everev.vn/wp-content/uploads/2022/11/ezgsif-300x112.png"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://everev.vn/wp-content/uploads/2022/11/OIP-300x84.png"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://everev.vn/wp-content/uploads/2022/11/star-charge-logo-1280x-q95-300x75.png"
              alt=""
            />
          </div>
        </Marquee>
      </div>
    );
  }
}
