import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import "./login.css";
import "./button.scss";
import axios from "axios";
import { logout } from "../../redux/action/auth";
const Resetpassword = () => {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var checkPassword =
    /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  useEffect(() => {
    const userinfo = window.localStorage.getItem("token");
    setToken(userinfo);
  });
  const handleSubmit = () => {
    if (!checkPassword.test(password)) {
      toast.error(
        "Mật khẩu chứa kí tự chữ hoa, thường, ký tự đặc biệt và số và từ 8 ký tự trở lên"
      );
      return;
    } else if (password === confirmpassword) {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}user/password`,
          {
            password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((result) => {
          toast.success("Mật khẩu đã được cập nhật");
          dispatch(logout(navigate));
        })
        .catch((err) => {
          toast.error("Lỗi");
        });
    } else {
      toast.error("Mật khẩu không đúng");
    }
  };
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="container w-2/4 mx-auto">
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

export default Resetpassword;
