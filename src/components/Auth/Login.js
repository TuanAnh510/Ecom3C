import React, { useState, useEffect } from "react";
import { useNavigate, link, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { signin, signinGoogle } from "../../redux/action/auth";
import PuffLoader from "react-spinners/PuffLoader";
import { useGoogleLogin } from "@react-oauth/google";
import imgGoogle from "./image/Google__G__Logo.svg.png";
import imgFacebook from "./image/Facebook_F_icon.svg.png";
import axios from "axios";
import "./login.css";
import "./button.scss";
import OAuth2Login from "react-simple-oauth2-login";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (email !== "" && password !== "") {
      dispatch(signin({ email, password }, navigate));
    } else {
      toast.error("Vui lòng nhập đầy đủ thông tin đăng nhập");
    }
  }
  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;

    dispatch(signinGoogle(accessToken, navigate));
  }
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  const loginFb = async (e) => {
    const accessToken = e.access_token;
    const typeLogin = "facebook";
    const callApi = await axios
      .post(`${process.env.REACT_APP_API_URL}user/login`, {
        accessToken,
        typeLogin,
      })
      .then((result) => {
        toast.success("Đăng nhập thành công !");
      })
      .catch((err) => {
        if (err.response.status == 400) {
          toast.error("Không tìm thấy tài khoản");
        }
      });
  };
  const onFailure = (e) => {
    toast.error("Đã xảy ra lỗi");
  };
  return (
    <div>
      <div className="parent clearfix">
        <div className="bg-illustration">
          <div className="burger-btn">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="login">
          <div className="container">
            <h1>
              Đăng nhập
              <br />
              <span style={{ color: "#6698FF" }}> DDYB - Electronic </span>
            </h1>

            <div className="login-form">
              <div className="flex justify-center gap-10 lg:w-[500px] w-[351px]">
                <div className="w-[260px] h-[50px] bg-gray-200 border rounded-full flex items-start align-start justify-start">
                    <Link
                      to={""}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img
                        src={imgFacebook}
                        alt="facebook_logo"
                        className="w-[30px] h-[30px] mt-auto mb-auto"
                      />
                      <OAuth2Login
                        className=" text-black"
                        buttonText="Facebook"
                        authorizationUrl="https://www.facebook.com/dialog/oauth"
                        responseType="token"
                        clientId="203369009102213"
                        redirectUri=" https://ecom-oto.vercel.app/"
                        scope="public_profile"
                        onSuccess={loginFb}
                        onFailure={onFailure}
                      />
                    </Link>
                </div>

                <div className="">
                  <button
                    className="w-[230px] h-[50px] bg-gray-200 border rounded-full flex items-start align-start justify-start"
                    onClick={() => login()}
                  >
                    <img
                      src={imgGoogle}
                      alt="google_logo"
                      className="w-[30px] h-[30px] mt-auto mb-auto"
                    />
                    <span className="text-black ml-[25px]">Google</span>
                  </button>
                </div>
              </div>
              <h6 className="pt-[20px] text-center">
                <b>Hoặc đăng nhập bằng</b>
              </h6>
              <form action="">
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div
                  className="forget-pass"
                  style={{
                    textAlign: "left",
                  }}
                >
                  <Link to={"/Register"}>
                    <a href="#">
                      Chưa có tài khoản? <b>Đăng kí tại đây!</b>
                    </a>
                  </Link>
                </div>
                <div
                  className="forget-pass"
                  style={{
                    textAlign: "left",
                  }}
                >
                  <Link to={"/forgotpassword"}>
                    <a href="#">Quên mật khẩu?</a>
                  </Link>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  id="submit"
                  className="btn-dn"
                >
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <PuffLoader color="#eaeae8" size={40} />
                    </div>
                  ) : (
                    "Đăng nhập"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
