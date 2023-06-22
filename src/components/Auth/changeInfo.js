import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import "./login.css";
import "./button.scss";
import axios from "axios";
import { logout } from "../../redux/action/auth";
const ChangeInfo = () => {
  const [fristname, setFristName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var checkPassword =
    /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  useEffect(() => {
    const usertoken = window.localStorage.getItem("token");
    setToken(usertoken);
    const userinfo = JSON.parse(window.localStorage.getItem("user_infos"));
    const namelast = userinfo ? userinfo.lastname : null;
    const namefirst = userinfo ? userinfo.firstname : null;
    const email = userinfo ? userinfo.email : null;
    const mobile = userinfo ? userinfo.mobile : null;
    setLastName(namelast);
    setFristName(namefirst);
    setEmail(email);
    setMobile(mobile);
  }, []);
  const handleSubmit = () => {
    if (
      lastname == null ||
      fristname == null ||
      email == null ||
      mobile == null
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    } else if (mobile.length < 10) {
      toast.error("Số điện thoại phải lớn hơn 10 số");
      return;
    } else {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}user/edit-user`,
          {
            fristname: fristname,
            lastname: lastname,
            mobile: mobile,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((result) => {
          toast.success("Thay đổi thông tin thành công");
        })
        .catch((err) => {
          toast.error("Đã xảy ra lỗi!", err);
        });
    }
  };
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="container w-2/4 mx-auto">
        <h6 className="text-center font-bold">
          <b>Thay đổi thông tin cá nhân</b>
        </h6>
        <label className="mt-4 ">Email</label>
        <input
          type="text"
          name="email"
          placeholder="Nhập họ"
          value={email}
          disabled="true"
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg py-2 px-4 mb-4 w-full"
        />

        <label className="mt-4">Nhập tên</label>
        <input
          type="text"
          name="fristname"
          placeholder="Nhập tên"
          value={fristname}
          onChange={(e) => setFristName(e.target.value)}
          className="border border-gray-300 rounded-lg py-2 px-4 mb-4 w-full"
        />
        <label className="mt-4">Nhập họ</label>
        <input
          type="text"
          name="lastname"
          placeholder="Nhập họ"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          className="border border-gray-300 rounded-lg py-2 px-4 mb-4 w-full"
        />

        <label className="mt-4">Nhập số điện thoại</label>
        <input
          type="text"
          name="mobile"
          placeholder="Nhập số điện thoại"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="border border-gray-300 rounded-lg py-2 px-4 mb-4 w-full"
        />

        <button
          type="submit"
          id="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white rounded-lg py-2 px-4 mt-4 w-full"
        >
          Thay đổi
        </button>
      </div>
    </div>
  );
};

export default ChangeInfo;
