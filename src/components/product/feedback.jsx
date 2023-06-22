import React from "react";
import { useState } from "react";
import "./StarRating.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { WindowsFilled } from "@ant-design/icons";
const FeedBack = ({ idproduct }) => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [totalStars, setTotalStars] = useState(5);
  const [noidung, setnoidung] = useState("");
  const handleStarClick = (starIndex) => {
    setSelectedStars(starIndex + 1);
  };
  const { isauth } = useSelector((store) => store.login);
  var checkMail =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  const sendFeedBack = async (e) => {
    e.preventDefault();

    const userinfoStr = localStorage.getItem("user_infos");
    const userinfo = JSON.parse(userinfoStr);
    if (noidung == "") {
      toast.warning("Nhập phản hồi của bạn");
      return;
    }
    if (selectedStars == 0) {
      toast.warning("Vui lòng chọn đánh giá");
      return;
    }
    await axios
      .post(`${process.env.REACT_APP_API_URL}feedbackproduct/`, {
        email: userinfo.email,
        quality: selectedStars,
        comment: noidung,
        usename: userinfo.lastname + " " + userinfo.firstname,
        idproduct: idproduct,
      })
      .then((data) => {
        if (data.data.status) {
          toast.success("Gửi thành công - Cảm ơn bạn đã gửi đánh giá");
        } else toast.success("Lỗi");
      });
    // toast("Đang xử lý...");
  };

  const renderStar = (starIndex) => {
    return (
      <span
        key={starIndex}
        className={starIndex < selectedStars ? "star selected" : "star"}
        onClick={() => handleStarClick(starIndex)}
      >
        &#9733;
      </span>
    );
  };
  return (
    <div className="w-full pt-10">
      <form className="bg-[#F2F2F2] p-5" onSubmit={sendFeedBack}>
        <div className="pb-2">
          <h2 className="text-[20px] font-bold">Trả lời</h2>
          <span className="pt-2 text-[#000]">
            Email của bạn sẽ không được hiển thị công khai. Các trường bắt buộc
            được đánh dấu <span className="text-red-500">*</span>
          </span>
        </div>
        <div className="w-full text-center text-[15px]">
          <div className="star-rating">
            {[...Array(totalStars)].map((n, i) => renderStar(i))}{" "}
            <p className="selected-stars">
              {selectedStars} trên {totalStars} sao được chọn
            </p>
          </div>
        </div>
        <div className="flex flex-wrap w-full mb-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-name"
          >
            Bình luận <span className="text-red-500">*</span>
          </label>
          <textarea
            className="appearance-none block w-full h-28 bg-white text-gray-700 border border-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-comment"
            required
            onChange={(e) => setnoidung(e.target.value)}
          ></textarea>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3">
            {isauth == true ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                PHẢN HỒI
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed focus:shadow-outline"
                type="submit"
                disabled
              >
                Đăng nhập để đánh giá
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
export default FeedBack;
