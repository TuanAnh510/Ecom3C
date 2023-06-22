import moment from "moment";
import React, { useState, useEffect } from "react";
import axios from "axios";
const ShowFeedBackBlog = ({ propsblogid }) => {
  const [feedbackblog, setFeedBackBlog] = useState([]);
  useEffect(() => {
    const getFeedback = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}feedbackblog/feedback?blogid=${propsblogid}`
        )
        .then((response) => {
          setFeedBackBlog(response.data);
        });
    };
    getFeedback();
  }, [feedbackblog]);
  return (
    <div>
      <div className="w-full font-bold text-[20px]">
        <h1>Bình luận</h1>
      </div>
      <div className="overflow-y-scroll h-[270px]">
        <hr />
        {feedbackblog.map((item) => (
          <div className="pt-1 pb-1">
            <div className="font-bold text-[14px]">
              <p>{item.usename}</p>
            </div>

            <div className="text-[13px]">
              <p className=" text-gray-400">
                Thời gian:{" "}
                <span className="italic text-gray-600 ">
                  {moment(item.createdAt).format("DD-MM-YYYY")}
                </span>
              </p>
              <p className="text-gray-400 ">
                Nội dung:{" "}
                <span className="italic text-gray-600 ">{item.comment}</span>
              </p>
            </div>
            <hr className="" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ShowFeedBackBlog;
