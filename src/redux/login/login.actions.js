import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  LOGIN_GET_LOADING,
  LOGIN_GET_SUCCESS,
  LOGIN_GET_ERROR,
  UPDATE_GET_SUCCESS,
  LOGOUT_GET,
} from "./login.types";
export const login = (creds) => async (dispatch) => {
  const navigate  = useNavigate();
  dispatch({ type: LOGIN_GET_LOADING });
  try {
    let res = await axios.post(`${process.env.REACT_APP_API_URL}user/login`, creds);
    let data = await res.data;
    // return console.log(res);
    return dispatch({ type: LOGIN_GET_SUCCESS, payload: data });
  } catch (e) {
    return dispatch({ type: LOGIN_GET_ERROR, payload: e.message });
  }
};

export const logout = (navigate) => async (dispatch) => {
  // to remove all userinfo at the time of user logout
  navigate("/");
  toast.success("Đăng xuất thành công");
  return dispatch({
    type: LOGOUT_GET,
  });
};
