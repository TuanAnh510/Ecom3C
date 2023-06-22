import {
  LOGIN_GET_ERROR,
  LOGIN_GET_SUCCESS,
  LOGIN_GET_LOADING,
  LOGOUT_GET,
  UPDATE_GET_SUCCESS,
} from "./login.types";

let local = localStorage.getItem("userrole");

var checkAdminAuth = false;
if (local == "admin") {
  checkAdminAuth = true;
}
var checkSellerAuth = false;
if (local == "seller") {
  checkSellerAuth = true;
}

let initialstate = {
  isauth: false,
  isloading: false,
  iserror: false,
  token: "",
  user: {},
  AdminIsAuth: checkAdminAuth,
  SellerIsAuth: checkSellerAuth,
};

export const loginReducer = (state = initialstate, { type, payload }) => {
  switch (type) {
    case LOGIN_GET_LOADING: {
      return {
        ...state,
        isloading: true,
        iserror: false,
      };
    }
    case LOGIN_GET_SUCCESS: {
      // return console.log(payload.role);

      localStorage.setItem("token", payload.token);
      // This thing is done for showing user info in userprofilepage
      localStorage.setItem("userrole", payload.role);
      localStorage.setItem("username", payload.lastname);
      localStorage.setItem("userfirstname", payload.lastname);
      localStorage.setItem("useremail", payload.email);
      localStorage.setItem("usercreatedAt", payload.createdAt);
      return {
        ...state,
        isloading: false,
        iserror: false,
        token: payload.token,
        isauth: true,
        user: payload,
        AdminIsAuth: payload.role == "admin",
        SellerIsAuth: payload.role == "seller",
      };
    }

    case LOGIN_GET_ERROR: {
      return {
        ...state,
        isloading: false,
        iserror: true,
      };
    }
    case LOGOUT_GET: {
      localStorage.removeItem("token");
      localStorage.removeItem("userrole");
      localStorage.removeItem("username");
      localStorage.removeItem("useremail");
      localStorage.removeItem("usercreatedAt");
      localStorage.removeItem("userfirstname");
      return {
        ...initialstate,
      };
    }
    default:
      return state;
  }
};
