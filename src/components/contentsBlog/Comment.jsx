import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FiSend } from "react-icons/fi";
const Comment = (blogid) => {
  const [noidung, setnoidung] = useState("");
  const { isauth } = useSelector((store) => store.login);
  var checkMail =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const sendFeedBackBlog = async (e) => {
    e.preventDefault();
    if (noidung == "") {
      toast.warning("Nhập bình luận của bạn");
      return;
    }
    const userinfoStr = localStorage.getItem("user_infos");
    const userinfo = JSON.parse(userinfoStr);
    await axios
      .post(`${process.env.REACT_APP_API_URL}feedbackblog/`, {
        email: userinfo.email,
        comment: noidung,
        usename: userinfo.lastname + " " + userinfo.firstname,
        idblog: blogid.blogid,
      })
      .then((data) => {
        if (data.data.status) {
          toast.success("Gửi bình luận thành công");
        } else toast.success("Lỗi");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="w-full pt-10">
      <form className="bg-[#F2F2F2] p-5" onSubmit={sendFeedBackBlog}>
        <div className="pb-5">
          <h2 className="text-[20px] font-bold">Trả lời</h2>
          <span className="pt-2 text-[#000]">
            Email của bạn sẽ không được hiển thị công khai. Các trường bắt buộc
            được đánh dấu *
          </span>
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
            onChange={(e) => setnoidung(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          {isauth == true ? (
            <div className="w-full px-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                <FiSend />
              </button>
            </div>
          ) : (
            <div className="w-full px-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed focus:shadow-outline"
                type="submit"
                disabled
              >
                <FiSend />
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
export default Comment;
