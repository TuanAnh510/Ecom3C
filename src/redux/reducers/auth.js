import {
  LOGIN_GET_ERROR,
  LOGIN_GET_SUCCESS,
  LOGIN_GET_LOADING,
  LOGOUT_GET,
  UPDATE_GET_SUCCESS,
} from "../const/actionsTypes";

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
      localStorage.setItem("user_infos", JSON.stringify(payload));
      localStorage.setItem("token", payload.token);
      localStorage.setItem("userfirstname", payload.firstname);
      localStorage.setItem("username", payload.lastname);
      localStorage.setItem("useremail", payload.email);
      localStorage.setItem("usermobile", payload.mobile);
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
      localStorage.removeItem("user_infos");
      localStorage.removeItem("username");
      localStorage.removeItem("useremail");
      localStorage.removeItem("usercreatedAt");
      localStorage.removeItem("usermobile");
      localStorage.removeItem("cartItems");
      return {
        ...initialstate,
      };
    }
    default:
      return state;
  }
};
