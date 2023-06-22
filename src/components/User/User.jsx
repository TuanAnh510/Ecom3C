import "./User.scss";
import { Link } from "react-router-dom";
import { addItem, removeItem } from "../../redux/action/cartActions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import React, { useContext, useEffect, useState, useReducer } from "react";
import "./ProfileCard.css";
import avatar from "./profile.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PuffLoader from "react-spinners/PuffLoader";
import TableAntd from "./TableGetOrder";
import TableAntdAction from "./TableGetOrderAction";
import LoadingPage from "../loadingPage/LoadingPage";
var checkPassword =
  /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const UserProfile = () => {
  const userId = JSON.parse(window.localStorage.getItem("user_infos"));
  const iduser = userId ? userId._id : null; // Kiểm tra nếu userId tồn tại, thì lấy giá trị _id, ngược lại gán giá trị null cho iduser
  const [alloder, setAllOder] = useState([]);

  useEffect(() => {
    if (iduser) {
      const getalloder = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}orders/getorderuser/${iduser}`
          );
          setAllOder(response.data);
        } catch (error) {
          // Xử lý lỗi nếu cần thiết
        }
      };

      getalloder();
    }
  }, [iduser]);

  const dangxuly =
    alloder.filter((order) => order.orderStatus === "Đang xử lý") || [];
  const daxacnhan =
    alloder.filter((order) => order.orderStatus === "Đã xác nhận") || [];
  const danggiaohang =
    alloder.filter((order) => order.orderStatus === "Đang giao hàng") || [];
  const dagiaohang =
    alloder.filter((order) => order.orderStatus === "Đã giao hàng") || [];
  const dahuy = alloder.filter((order) => order.orderStatus === "Đã hủy") || [];

  const userName = localStorage.getItem("username") || "";
  const userEmail = localStorage.getItem("useremail") || "";
  const userMobile = localStorage.getItem("usermobile") || "";
  const userFirstName = localStorage.getItem("userfirstname") || "";

  const userCreate = localStorage.getItem("usercreatedAt") || "";

  return (
    <div className="home w-full">
      <div className="homeContainer w-3/4 ml-auto mr-auto p-10">
        <div>
          <div className="card-container" style={{ textAlign: "center" }}>
            <div className="headerUser">
              <img
                className="imgavt"
                src={avatar}
                alt={userName + " " + userFirstName}
                style={{
                  height: "200px",
                  width: "200px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />
            </div>
            <div className="social-container">
              <div className="followers">
                <h1 className="text-sm text-gray-700">Email</h1>
                <h2 className="bold-text" style={{ paddingBottom: "20px" }}>
                  {userEmail ? userEmail : <LoadingPage size={32} />}
                </h2>
              </div>
              <div className="likes">
                <h1 className="text-sm text-gray-700">Họ và tên</h1>
                <h2 className="bold-text" style={{ paddingBottom: "20px" }}>
                  {userName ? userName + " " + userFirstName : <LoadingPage size={32} />}
                </h2>
              </div>
              <div className="likes">
                <h1 className="text-sm text-gray-700">Số điện thoại</h1>
                <h2 className="bold-text" style={{ paddingBottom: "20px" }}>
                  {userMobile ? userMobile : <LoadingPage size={32} />}
                </h2>
              </div>
              <div className="likes">
                <h1 className="text-sm text-gray-700">Ngày đăng ký</h1>
                <h2 className="bold-text" style={{ paddingBottom: "20px" }}>
                  {userCreate
                    ? moment(userCreate).format("DD/MM/YYYY")
                    : <LoadingPage size={32} />}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="orderhistory w-full ml-auto mr-auto p-10">
        <div className="px-6 pb-6 mt-6 border-t w-[100%] border-gray-300 ">
          <Tabs value="tatca">
            <TabsHeader className="bg-[#007bff]">
              <Tab value="tatca">Tất cả</Tab>
              <Tab value="xuly" className="z-30">
                Đang xử lý
              </Tab>
              <Tab value="xacnhan" className="z-30">
                Đã xác nhận
              </Tab>
              <Tab value="danggiao" className="z-30">
                Đang giao
              </Tab>
              <Tab value="hoanthanh" className="z-30">
                Hoàn thành
              </Tab>
              <Tab value="dahuy" className="z-30">
                Đã hủy
              </Tab>
            </TabsHeader>

            <TabsBody
              animate={{
                initial: { y: 250 },
                mount: { y: 0 },
                unmount: { y: 250 },
              }}
            >
              <TabPanel value="tatca">
                <TableAntd orderData={alloder} />
              </TabPanel>
            </TabsBody>

            <TabsBody
              animate={{
                initial: { y: 250 },
                mount: { y: 0 },
                unmount: { y: 250 },
              }}
            >
              <TabPanel value="xuly">
                <TableAntdAction orderData={dangxuly} />
              </TabPanel>
            </TabsBody>

            <TabsBody
              animate={{
                initial: { y: 250 },
                mount: { y: 0 },
                unmount: { y: 250 },
              }}
            >
              <TabPanel value="xacnhan">
                <TableAntd orderData={daxacnhan} />
              </TabPanel>
            </TabsBody>

            <TabsBody
              animate={{
                initial: { y: 250 },
                mount: { y: 0 },
                unmount: { y: 250 },
              }}
            >
              <TabPanel value="danggiao">
                <TableAntd orderData={danggiaohang} />
              </TabPanel>
            </TabsBody>

            <TabsBody
              animate={{
                initial: { y: 250 },
                mount: { y: 0 },
                unmount: { y: 250 },
              }}
            >
              <TabPanel value="hoanthanh">
                <TableAntd orderData={dagiaohang} />
              </TabPanel>
            </TabsBody>

            <TabsBody
              animate={{
                initial: { y: 250 },
                mount: { y: 0 },
                unmount: { y: 250 },
              }}
            >
              <TabPanel value="dahuy">
                <TableAntd orderData={dahuy} />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
