import {
  AUTH,
  LOGIN_GET_LOADING,
  LOGIN_GET_SUCCESS,
  LOGIN_GET_ERROR,
  UPDATE_GET_SUCCESS,
  LOGOUT_GET,
} from "../const/actionsTypes";
import * as api from "../../api/index";
import { toast } from "react-toastify";
import axios from "axios";

export const loadUser = () => async (dispath) => {
  const localUser = JSON.parse(localStorage.getItem("user_infos"));
  if (localUser) {
    dispath({ type: LOGIN_GET_SUCCESS, payload: localUser });
  }
};

export const signin = (data2, navigate) => async (dispatch) => {
  dispatch({ type: LOGIN_GET_LOADING });
  const MAX_LOGIN_ATTEMPTS = 3;
  const LOCKOUT_DURATION = 2 * 1000;
  const storedAttempts =
    parseInt(window.localStorage.getItem("loginAttempts")) || 0;
  const lockoutTime = parseInt(window.localStorage.getItem("lockoutTime")) || 0;
  const currentTime = new Date().getTime();

  if (lockoutTime && currentTime - lockoutTime < LOCKOUT_DURATION) {
    toast.error("Tài khoản của bạn đã bị khóa. Vui lòng thử lại sau.");
    return;
  }
  await window.localStorage.setItem("loginAttempts", "0");
  await window.localStorage.setItem("lockoutTime", "0");
  if (storedAttempts < MAX_LOGIN_ATTEMPTS) {
    try {
      const { data } = await api.signIn(data2);
      if (data.isBlocked === false) {
        toast.error("Tài khoản của bạn đã bị khóa. Vui lòng liên hệ với quản trị viên.");
        return; 
      }else{
        toast.success("Đăng nhập thành công");
        window.localStorage.setItem("loginAttempts", "0");
        window.localStorage.setItem("lockoutTime", "0");
        navigate("/");
        return dispatch({ type: LOGIN_GET_SUCCESS, payload: data });
      }
    } catch (err) {
      if (err.response.data.message == "Invalid Credentials") {
        toast.error("Sai tài khoản hoặc mật khẩu");
        window.localStorage.setItem(
          "loginAttempts",
          (storedAttempts + 1).toString()
        );
        if (storedAttempts + 1 === MAX_LOGIN_ATTEMPTS) {
          window.localStorage.setItem("lockoutTime", currentTime.toString());
          toast.error(
            "Bạn đã vượt quá số lần đăng nhập sai cho phép. Tài khoản của bạn sẽ bị khóa trong 5 phút."
          );
        }
      }
    }
  } else if (lockoutTime && currentTime - lockoutTime > LOCKOUT_DURATION) {
    await window.localStorage.setItem("loginAttempts", "0");
    await window.localStorage.setItem("lockoutTime", "0");
    try {
      const { data } = await api.signIn(data2);
      toast.success("Đăng nhập thành công");
      navigate("/");
      return dispatch({ type: LOGIN_GET_SUCCESS, payload: data });
    } catch (err) {
      if (err.response.data.message == "Invalid Credentials") {
        toast.error("Sai tài khoản hoặc mật khẩu");
        window.localStorage.setItem(
          "loginAttempts",
          (storedAttempts + 1).toString()
        );
        if (storedAttempts + 1 === MAX_LOGIN_ATTEMPTS) {
          window.localStorage.setItem("lockoutTime", currentTime.toString());
          toast.error(
            "Bạn đã vượt quá số lần đăng nhập sai cho phép. Tài khoản của bạn sẽ bị khóa trong 5 phút."
          );
        }
      }
    }
  } else {
    toast.error("Đăng nhập bị khóa do quá nhiều lần đăng nhập sai.");
  }
};

export const signinGoogle = (accessToken, navigate) => async (dispatch) => {
  dispatch({ type: LOGIN_GET_LOADING });
  try {
    const { data } = await api.signInGoogle(accessToken);

    toast.success("Đăng nhập thành công");
    navigate("/");

    return dispatch({ type: LOGIN_GET_SUCCESS, payload: data });
  } catch (err) {
    if (err.response.data.message == "User don't exist!") {
      const { data } = await api.signUpGoogle(accessToken);
      navigate("/");
      return dispatch({ type: LOGIN_GET_SUCCESS, payload: data.result });
    }
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  dispatch({ type: LOGIN_GET_LOADING });

  try {
    // signup user

    const { data } = await api.signUp(formData);

    toast.success("Đăng ký thành công");
    navigate("/");
    return dispatch({ type: LOGIN_GET_SUCCESS, payload: data });
  } catch (err) {
    if (err.response.status == "500") {
      return toast.error("Email đã tồn tại");
    }
  }
};

export const signupGoogle = (accessToken, navigate) => async (dispatch) => {
  dispatch({ type: LOGIN_GET_LOADING });
  try {
    const { data } = await api.signUpGoogle(accessToken);
    toast.success("Đăng ký thành công");
    navigate("/");
    return dispatch({ type: LOGIN_GET_SUCCESS, payload: data });
  } catch (err) {
    if (err.response.status == "500") {
      return toast.error("Email đã tồn tại");
    }
  }
};

export const logout = (navigate) => async (dispatch) => {
  toast.success("Đăng xuất thành công");
  navigate("/");
  return dispatch({
    type: LOGOUT_GET,
  });
};