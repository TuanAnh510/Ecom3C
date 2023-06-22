import { RiShoppingCartFill, RiUserSharedFill } from "react-icons/ri";
import {
  FcKey,
  FcSynchronize,
  FcExport,
  FcManager,
  FcBusinessman,
  FcImport,
} from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { logout } from "../../redux/action/auth";
import { useEffect, useState } from "react";
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { Modal } from "react-bootstrap";
import { AiOutlineCloseCircle, AiOutlineMessage } from "react-icons/ai";
const Headergiohang = () => {
  const { isauth } = useSelector((store) => store.login);
  const [lastname, setLastName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [iduser, setIdUser] = useState("");
  const [modalpassword, setModalPassword] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const userinfo = JSON.parse(window.localStorage.getItem("user_infos"));
    const namelast = userinfo ? userinfo.lastname : null;
    const namefirst = userinfo ? userinfo.firstname : null;
    const id = userinfo ? userinfo._id : null;
    setIdUser(id);
    setLastName(namelast);
    setFirstName(namefirst);
  });
  const handleLogout = async () => {
    await navigate("/");
    dispatch(logout(navigate));
    setOpenDropdown(false);
  };

  const toggleDropdown = (iduser) => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <>
      <nav className="flex text-black">
        <div className="lg:ml-[93%] ml-[70%] pb-[10px]">
          {cartItems.length > 0 && (
            <span className="cart-basket z-10 absolute ml-[34px] mt-[3px] bg-red-500 rounded-full flex items-center justify-center w-[24px] h-[24px] text-white">
              {cartItems.length}
            </span>
          )}
          <Link to="/cart">
            <RiShoppingCartFill
              onClick={() => setOpenDropdown(false)}
              className="w-10 h-10 mt-[10px] text-[#6698ff]"
            />
          </Link>
        </div>
        {isauth === true ? (
          <div className="lg:ml-auto ml-auto">
            <CDropdown
              variant="nav-item"
              className="relative"
              style={{ listStyle: "none" }}
              onClick={toggleDropdown}
            >
              <ToastContainer />
              <CDropdownToggle
                placement="bottom-end"
                className="py-0"
                caret={false}
              >
                <FcBusinessman className="w-10 h-10 mt-[11px] text-[#6698ff]" />
              </CDropdownToggle>
              {openDropdown && (
                <CDropdownMenu className="px-0 mt-2 w-48 absolute z-50 bg-white rounded shadow-lg border border-gray-200">
                  <CDropdownHeader className="bg-gray-200 text-black px-2 py-2 font-semibold">
                    {lastname + " " + firstname}
                  </CDropdownHeader>
                  <CDropdownItem className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/userinfo">
                      <FcManager className="mr-2 inline w-5 h-5" /> Trang cá
                      nhân
                    </Link>
                  </CDropdownItem>
                  <CDropdownItem className="px-4 py-2 hover:bg-gray-100">
                    <Link to={"/edit_user"}>
                      <FcSynchronize className="mr-2 inline" /> Thay đổi
                    </Link>
                  </CDropdownItem>
                  <CDropdownItem className="px-4 py-2 hover:bg-gray-100">
                    <Link to={"/resetpassword"}>
                      <FcKey className="mr-2 inline" /> Đổi mật khẩu
                    </Link>
                  </CDropdownItem>
                  <CDropdownItem className="px-4 py-2 hover:bg-gray-100">
                    <Link onClick={handleLogout}>
                      <FcExport className="mr-2 inline" /> Đăng xuất
                    </Link>
                  </CDropdownItem>
                </CDropdownMenu>
              )}
            </CDropdown>
          </div>
        ) : (
          <>
            <div className="lg:ml-auto ml-auto">
              <Link to="/login">
                <FcImport className="w-10 h-10 mt-[10px] mr-[10px] mb-[10px] text-[#6698ff]" />
              </Link>
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default Headergiohang;
