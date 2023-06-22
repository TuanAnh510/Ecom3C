import React, { useState, useEffect } from "react";
import { useNavigate, link, Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import PuffLoader from "react-spinners/PuffLoader";
import "../login.css";
import "../button.scss";
import OAuth2Login from "react-simple-oauth2-login";
import axios from "axios";
import { Result } from "antd";
const ChangePassWord = () => {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();
  const handleSubmit = () => {
    if (password == confirmpassword) {
      axios
        .put(`${process.env.REACT_APP_API_URL}user/reset-password/${token}`, {
          password,
        })
        .then((result) => {
          toast.success("Mật khẩu đã được cập nhật");
          navigate("/login");
        })
        .catch((err) => {
          toast.error("Mã đã hết hạn");
        });
    } else {
      toast.error("Mật khẩu không trùng khớp");
    }
  };
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="container mx-auto w-2/4">
        <h6 className="text-center font-bold">
          <b>Nhập mật khẩu mới của bạn</b>
        </h6>
        <input
          type="password"
          name="password"
          placeholder="Password mới"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg py-2 px-4 mt-4 w-full"
        />

        <input
          type="password"
          name="confirmpassword"
          placeholder="Nhập lại mật khẩu"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-gray-300 rounded-lg py-2 px-4 mt-4 w-full"
        />

        <div className="text-left mt-4">
          <Link to="/login">Đăng nhập</Link>
        </div>

        <button
          type="submit"
          id="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white rounded-lg py-2 px-4 mt-4 w-full"
        >
          Thay đổi mật khẩu
        </button>
      </div>
    </div>
  );
};

export default ChangePassWord;
