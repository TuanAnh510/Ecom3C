import moment from "moment";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StarRating.css";
const ShowFeedBackProduct = ({ idproductfeedback }) => {
  const [feedbackproduct, setFeedbackProduct] = useState([]);

  const renderStar = (starIndex) => {
    return (
      <span key={starIndex} className={"star selected"}>
        &#9733;
      </span>
    );
  };
  useEffect(() => {
    const getFeedback = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}feedbackproduct/feedback?idproducts=${idproductfeedback}`
        )
        .then((response) => {
          setFeedbackProduct(response.data);
        });
    };
    getFeedback();
  }, [feedbackproduct]);
  return (
    <div>
      <div className="w-full font-bold text-[20px]">
        <span className="text-xl font-bold uppercase font-sans">Đánh giá</span>
      </div>
      <div className="overflow-y-scroll h-[350px]">
        <hr />
        {feedbackproduct.map((item) => (
          <div>
            <div className="font-bold text-[14px] pt-2">
              <p>{item.usename}</p>
            </div>
            <div className="text-[13px] ">
              <p className=" text-gray-400">
                Thời gian:{" "}
                <span className="italic text-gray-600 ">
                  {moment(item.createdAt).format("DD-MM-YYYY")}
                </span>
              </p>
              <p className=" text-gray-400">
                Đánh giá:{" "}
                {[...Array(item.quality)].map((n, i) => renderStar(i))}{" "}
              </p>

              <p className="text-gray-400 ">
                Nội dung:{" "}
                <span className="italic text-gray-600 ">{item.comment}</span>
              </p>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ShowFeedBackProduct;
