import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import "../login.css";
import "../button.scss";
import axios from "axios";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    axios
      .post(`http://localhost:5000/api/user/forgot-password-token`, {
        email,
      })
      .then((result) => {
        toast.success("Vui lòng kiểm tra email để cập nhật mật khẩu");
      })
      .catch((err) => {
        toast.error("Người dùng không tồn tại");
      });
  };
  return (
    <div className="flex justify-center items-center pt-[20px] pb-[40px]">
      <div className="w-full max-w-md">
        <h6 className="mb-2 font-bold">Nhập email để lấy lại mật khẩu</h6>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-2 px-4 py-2 border border-solid border-black border-1 rounded focus:outline-none focus:border-blue-500"
        />
        <div className="text-left mb-4">
          <Link to={"/login"} className="text-blue-500">
            Quay lại?
          </Link>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Lấy lại
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
