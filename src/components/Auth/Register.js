import React, { Component, useState } from "react";
import Background from "./login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { signup, signupGoogle } from "../../redux/action/auth";
import PuffLoader from "react-spinners/PuffLoader";
// import "./button.scss";
const InitState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Register = () => {
  const nagivate = useNavigate();
  const dispatch = useDispatch();

  //Biểu thức chính quy
  const [sForm, setsForm] = useState(InitState);
  var checkMail =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var checkPassword =
    /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) =>
    setsForm({
      ...sForm,
      [e.target.name]: e.target.value,
    });

  function handleOnSubmit(e) {
    e.preventDefault();
    if (
      sForm.firstname == "" ||
      sForm.lastname == "" ||
      sForm.email == "" ||
      sForm.password == "" ||
      sForm.confirmPassword == "" ||
      sForm.mobile == ""
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin đăng ký!");
      return;
    } else if (sForm.password.length < 8) {
      toast.warning("Độ dài mật khẩu trên 8 kí tự");
      return;
    } else if (!checkPassword.test(sForm.password)) {
      toast.warning(
        "Mật khẩu phải có chữ hoa, chữ thường số và kí tự đặc biệt"
      );
      return;
    } else if (!checkMail.test(sForm.email) || sForm.email.length == "") {
      toast.warning("Email không hợp lệ!");
      return;
    } else if (sForm.password === sForm.confirmPassword) {
      dispatch(signup(sForm, nagivate));
    } else {
      toast.success("Nhập lại mật khẩu không chính xác");
    }
  }

  return (
    <div>
      <div>
        <div className="parent clearfix">
          <div className="bg-illustration">
            <div className="burger-btn">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <ToastContainer pauseOnHover={false} draggable={false} />
          <div className="login">
            <div className="container">
              <h1>
                Đăng ký tài khoản
                <br />
                <span style={{ color: "#07bc0c" }}>DDYB - Electronic</span>
              </h1>

              <div className="login-form">
                <form action="">
                  <input
                    type="text"
                    placeholder="Nhập họ "
                    name="firstname"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Nhập tên"
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="mobile"
                    placeholder="nhập số điện thoại"
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail "
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Nhập lại mật khẩu"
                    onChange={handleChange}
                  />

                  <div
                    className="forget-pass"
                    style={{
                      fontSize: "16px",
                      fontWeight: "normal",
                      color: "#918F8F",
                      textAlign: "right",
                    }}
                  >
                    <Link to={"/login"}>
                      <a href="#">
                        Đã có tài khoản? <b>Đăng nhập tại đây!</b>
                      </a>
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="btn-dn"
                    onClick={handleOnSubmit}
                  >
                    Đăng ký
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
