import axios from "axios";
import React from "react";
import react, { useState, useEffect, useRef } from "react";
import Heading from "../../common/Heading";
import "./recent.css";
import Slider from "react-slick";
import imgGirl from "./images.png";
import "./recent.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import imgerror from "../../images/imgerror.png";
import { getProductsAll } from "../../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Recent = ({ titleprodcut1, titleprodcut2 }) => {
  const [category, setCategory] = useState([]);
  const [defaultImage, setDefaultImage] = useState({});
  const [homeapi, setHomeapi] = useState([]);
  const [title1, settitle1] = useState([]);
  const [titel2, settitel2] = useState([]);
  const [descriptionsanpham1, setdescriptionsanpham1] = useState([]);
  const [descriptionsanpham2, setdescriptionsanpham2] = useState([]);
  const settings = {
    dots: false,
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

  useEffect(() => {
    const calldata1 = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}category/`)
        .then((response) => {
          const data = response.data.category;
          if (data) setCategory(data);
        });
    };
    calldata1();
  }, []);

  function categoryProduct(item) {
    const categoryProduct = category.find(
      (categorys) => categorys._id === item
    );

    if (categoryProduct) return categoryProduct.name;
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsAll());
  }, []);

  useEffect(() => {
    const getInfoweb = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}home/`)
        .then((response) => {
          setHomeapi(response.data);
          settitle1(response.data[0].titlesanpham1);
          setdescriptionsanpham1(response.data[0].descriptionsanpham1);
          settitel2(response.data[0].titlesanpham2);
          setdescriptionsanpham2(response.data[0].descriptionsanpham2);
        });
    };
    getInfoweb();
  }, []);

  const productState = useSelector((state) => state.product.products);

  return (
    <>
      <section className="recent padding">
        <div className="containers ">
          <div className="recent-info ">
            <div className="mb-2">
              <div className="slider-title pt-5 pb-5 text-center bg-color-button flex justify-center">
                <span className="text-2xl text-center font-bold text-white">
                  {" "}
                  <i className="fa fa-angle-down" aria-hidden="true"></i> Sản phẩm
                </span>
                <div className="brick"></div>
              </div>
              <div className="text-center p-5">{titleprodcut1}</div>
              <div className="slider bg-white ">
                <Slider {...settings} ref={sliderRef}>
                  {productState.map((item) => (
                    <Link key={item.id} to={`/productdetail/${item._id}`}>
                      <div className="card overflow-auto" key={item._id}>
                        <div className="card-top ">
                          <img
                            className="object-cover "
                            src={
                              item.imagesDefault
                                ? item.imagesDefault.secure_url
                                : imgerror
                            }
                            alt={item.name}
                            onError={handleErrorImage}
                          />
                        </div>{" "}
                        <div className="card-bottom flex flex-col items-start justify-center">
                          <span className="category text-3xl font-bold">
                            {item.name}
                          </span>
                          <h4 className="mt-5 ">{item.title}</h4>
                          <h3 className="mt-4 text-red-500 text-2xl font-bold">
                            {new Intl.NumberFormat({
                              style: "currency",
                              currency: "VND",
                            }).format(item.price)}{" "}
                            VNĐ
                          </h3>
                          <h4 className="mt-4 text-black font-medium">
                            Danh mục : {categoryProduct(item.idCategory)}
                          </h4>

                          <h4 className="mt-4 hover:text-[#6698FF]">
                            Xem chi tiết
                          </h4>
                          <Link to={`/productdetail/${item._id}`}></Link>
                        </div>
                      </div>
                    </Link>
                  ))}
                </Slider>
                <div>
                  <span
                    className="next cursor-pointer"
                    onClick={gotoPrev}
                  ></span>
                  <span
                    className="prew cursor-pointer"
                    onClick={gotoNext}
                  ></span>
                </div>
              </div>
            </div>
            <Heading className="" title="Sản phẩm" subtitle={titleprodcut2} />
            <div className="flex justify-between flex-col md:flex-row  gap-2 mt-10">
              <div className="bg-[#97DEFF]  w-[100%] p-10 flex flex-col justify-center shadow-md shadow-offset-x-2 shadow-offset-y-2 shadow-blur-2 shadow-color-gray-500 rounded-[10px] ">
                <div className="flex flex-col justify-center items-center ">
                  <img
                    className="w-[100px] h-[70px] "
                    src="	https://everev.vn/wp-content/uploads/2022/11/AC-500-%C3%97-350-px.png"
                    alt=""
                  />
                  <p className="text-2xl font-bold">{title1}</p>
                  <p>{descriptionsanpham1}</p>
                </div>
              </div>
              <div className="bg-[#97DEFF] w-[100%]  p-10 flex flex-col justify-center shadow-md shadow-offset-x-2 shadow-offset-y-2 shadow-blur-2 shadow-color-gray-500 rounded-[10px] ">
                <div className="flex flex-col justify-center items-center">
                  <img
                    className="w-[100px] h-[70px] "
                    src="https://everev.vn/wp-content/uploads/2022/11/AC-500-×-350-px-1.png"
                    alt=""
                  />
                  <p className="text-2xl font-bold">{titel2}</p>
                  <p>{descriptionsanpham2}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Recent;
