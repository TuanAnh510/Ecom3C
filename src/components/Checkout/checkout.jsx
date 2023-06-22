import React, { useEffect, useState } from "react";
import "./checkout.css";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import { FaShippingFast, FaAddressCard } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import {
  AiOutlineFileDone,
  AiOutlineProfile,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { GrUserExpert } from "react-icons/gr";
import git from "../images/save-money.gif";
import gitcheck from "../images/verified.gif";
import paypal from "../images/paypal.jpg";
import momo from "../images/MoMo_Logo.png";
import cod from "../images/cod.jpg";
import LogoGHTK from "../images/Logo-GHTK.png";
import QRmomo from "../images/QRnhantien.jpg";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import ninja from "../images/cover.png";

// import {
//   createOrder,
//   getMoney,
//   resetOrder,
// } from "../redux/action/orderActions";
// import { resetCart } from "../redux/action/cartActions";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const steps = [
  {
    name: "Thông tin người nhận",
    icon: <AiOutlineProfile />,
  },
  {
    name: "Thông tin giao hàng",
    icon: <FaShippingFast />,
  },
  {
    name: "Thanh toán",
    icon: <MdPayment />,
  },
  {
    name: "Hoàn thành",
    icon: <AiOutlineFileDone />,
  },
];

const Shipping = [
  {
    id: 1,
    name: "Giao hàng tiết kiệm",
    image: LogoGHTK,
    time_shipping: "3 đến 5 ngày",
    price: 35000,
  },
  {
    id: 2,
    name: "Ninja Van",
    image: ninja,
    time_shipping: "2 đến 4 ngày",
    price: 40000,
  },
];

const payments = [
  {
    id: 1,
    name: "PayPal",
    image: paypal,
  },
  {
    id: 2,
    name: "MoMo",
    image: momo,
  },
  {
    id: 3,
    name: "Nhận hàng thanh toán",
    image: cod,
  },
];
const Checkout = () => {
  const dispatch = new useDispatch();
  let total = JSON.parse(localStorage.getItem("total")) || 0;
  const [userId, setUserId] = useState(localStorage.getItem("userid") || "");
  const [userName, setUserName] = useState(
    localStorage.getItem("username") || ""
  );
  const [userMobile, setUserMobile] = useState(
    localStorage.getItem("usermobile") || ""
  );
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("useremail") || ""
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [shipping, setShipping] = useState();
  const [payment, setPayment] = useState(payments[0]);
  const [totalprice, setTotalprice] = useState(total);
  const cart = useSelector((state) => state.cart);
  const [sumship, setSumship] = useState(0);
  const { cartItems } = cart;

  const sumPrice = (price, qty) => {
    const total = price * qty;
    return total;
  };
  const [thanhtoan, setThanhToan] = useState(0);
  const [tong, setTong] = useState(0);
  const id = window.localStorage.getItem("user_infos");

  useEffect(() => {
    if (shipping) {
      const priceship = shipping.price + total;
      setTotalprice(priceship);
    }
  }, [shipping]);

  // console.log(shipping.price);

  const paymentmanager = () => {
    const payPrice = totalprice / 23000;
    setThanhToan(payPrice.toFixed(2));
    return payPrice.toFixed(2);
  };

  const handleOrder = async () => {
    const cart = window.localStorage.getItem("cartItems");
    axios
      .post(`${process.env.REACT_APP_API_URL}orders/createOrder`, {
        products: JSON.parse(cart),
        namePayment: "Paypal",
        statusPayment: "Đã thanh toán",
        orderby: JSON.parse(id)._id,
        totalprice: totalprice,
      })
      .then(() => {
        toast.success("Đặt hàng thành công");
      });
  };

  const handerClicknext = () => {
    if (currentStep == 2 && shipping == undefined) {
      toast.warning("Hãy chọn đơn vị vận chuyển");
      return;
    }
    if (currentStep == 3 && payment == 0) {
      toast.warning("Hãy chọn phương thức thanh toán");
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <>
      <div className="flex justify-evenly z-10 pb-10 pt-10 border rounded-full mb-5">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? (
                <TiTick size={24} className="text-green-500" />
              ) : (
                step.icon
              )}
            </div>
            <p className="text-gray-500">{step.name}</p>
          </div>
        ))}
      </div>

      {!complete ? (
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 pt-1">
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Sản phẩm đã chọn</p>
            <p className="text-gray-400">
              Kiểm tra các mặt hàng của bạn. Và chọn một phương thức vận chuyển
              phù hợp.
            </p>
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 overflow-y-scroll">
              {cartItems.map((item) => (
                <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                  <img
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={item.image}
                    alt=""
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{item.title}</span>
                    <span className="float-right text-gray-400">
                      {item.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}{" "}
                      x {item.qty}
                    </span>
                    <p className="text-lg font-bold">
                      {sumPrice(item.price, item.qty).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {currentStep == 3 ? (
              <>
                <p className="mt-8 text-lg font-medium">
                  Phương thức thanh toán
                </p>
                <div className="h-[350px] overflow-y-scroll">
                  <form className="mt-5 grid gap-6">
                    {payments.map((item, index) => (
                      <div className="relative" key={item.id}>
                        {item.name == "PayPal" ? (
                          <input
                            className="peer hidden"
                            id={`radio_${index}`}
                            type="radio"
                            name="radio"
                            onClick={() => setPayment(item)}
                            required
                            checked
                          />
                        ) : (
                          <input
                            className="peer hidden"
                            id={`radio_${index}`}
                            type="radio"
                            name="radio"
                            onClick={() => setPayment(item)}
                            required
                          />
                        )}

                        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                        <label
                          className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                          for={`radio_${index}`}
                        >
                          <img
                            className="w-14 h-10 object-contain rounded-lg"
                            src={item.image}
                            alt=""
                          />
                          <div className="ml-5">
                            <span className="mt-2 font-semibold">
                              {item.name}
                            </span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </form>
                </div>
              </>
            ) : (
              <>
                <p className="mt-8 text-lg font-medium">Đơn vị vận chuyển</p>
                <form className="mt-5 grid gap-6">
                  {Shipping.map((item, index) => (
                    <div className="relative" key={item.id}>
                      <input
                        className="peer hidden"
                        id={`radio_${index}`}
                        type="radio"
                        name="radio"
                        onClick={() => setShipping(item)}
                      />
                      <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                      <label
                        className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                        for={`radio_${index}`}
                      >
                        <img
                          className="w-14 h-10 object-contain rounded-lg"
                          src={item.image}
                          alt=""
                        />
                        <div className="ml-5">
                          <span className="mt-2 font-semibold">
                            {item.name}
                          </span>
                          <p className="text-slate-500 text-sm leading-6 text-left">
                            {item.time_shipping}
                          </p>
                        </div>
                      </label>
                    </div>
                  ))}
                </form>
              </>
            )}
          </div>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 ">
            <div>
              {currentStep == 1 ? (
                <div className="">
                  <p className="text-xl font-medium">Thông tin</p>
                  <p className="text-gray-400">
                    Xem lại thông tin trước khi đặt hàng
                  </p>
                  <label
                    for="email"
                    className="mt-4 mb-2 block text-sm font-medium"
                  >
                    Tên người nhận
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full rounded-md border py-3 border-gray-200  pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />

                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <GrUserExpert />
                    </div>
                  </div>
                  <label
                    for="card-holder"
                    className="mt-4 mb-2 block text-sm font-medium"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full rounded-md border py-3 border-gray-200  pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <AiOutlineMail />
                    </div>
                  </div>
                  <label
                    for="card-holder"
                    className="mt-4 mb-2 block text-sm font-medium"
                  >
                    Số điện thoại
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={userMobile}
                      onChange={(e) => setUserMobile(e.target.value)}
                      className="w-full rounded-md border py-3 border-gray-200  pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Nhập số điện thoại"
                      required
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <AiOutlinePhone />
                    </div>
                  </div>

                  <button className="mt-4 mb-8 w-full rounded-md bg-[#6698ff] px-6 py-3 font-medium text-white">
                    Thay đổi thông tin
                  </button>
                </div>
              ) : currentStep == 2 ? (
                <div className="">
                  <p className="text-xl font-medium">Địa chỉ giao hàng</p>
                  <p className="text-gray-400">
                    Xem lại địa chỉ giao hàng trước khi đặt hàng
                  </p>
                  <label
                    for="email"
                    className="mt-4 mb-2 block text-sm font-medium"
                  >
                    Tỉnh/ Thành phố
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id=""
                      name=""
                      className="w-full rounded-md border py-3 border-gray-200  pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Tỉnh thành phố..."
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <FaAddressCard />
                    </div>
                  </div>
                  <label
                    for="card-holder"
                    className="mt-4 mb-2 block text-sm font-medium"
                  >
                    Quận/ Huyện
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id=""
                      name=""
                      className="w-full rounded-md border py-3 border-gray-200  pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Quận huyện..."
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <FaAddressCard />
                    </div>
                  </div>
                  <label
                    for="card-holder"
                    className="mt-4 mb-2 block text-sm font-medium"
                  >
                    Phường/ xã
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id=""
                      name=""
                      className="w-full rounded-md border py-3 border-gray-200  pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Phường xã"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <FaAddressCard />
                    </div>
                  </div>
                  <label
                    for="card-no"
                    className="mt-4 mb-2 block text-sm font-medium"
                  >
                    Số nhà
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id=""
                      name=""
                      className="w-full rounded-md border py-3 border-gray-200  pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Số nhà..."
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <FaAddressCard />
                    </div>
                  </div>
                  <button className="mt-4 mb-8 w-full rounded-md bg-[#6698ff] px-6 py-3 font-medium text-white">
                    Thay đổi thông tin
                  </button>
                </div>
              ) : currentStep == 3 && payment?.name == "PayPal" ? (
                <div className="lg:pt-24 sm:pt-2 ">
                  <h3 className="">PayPal</h3>
                  <p className="text-black font-normal">
                    {" "}
                    Hệ thống thanh toán cự kỳ bảo mật <br></br>
                    Mạng lưới hệ thống rộng khắp, sử dụng trên toàn thế giới một
                    cách nhanh chóng<br></br>
                    An toàn khi giao dịch cho cả người bán và người mua (tính
                    năng có thể đòi lại số tiền sau khi đã gửi tiền đến tài
                    khoản khác khi bị lừa đảo). <br></br>
                    Dịch vụ hỗ trợ chăm sóc khách hàng tốt và nhanh chóng.{" "}
                    <br></br>
                    Hạn chế bị lộ thông tin tài khoản ngân hàng, vì mỗi lần
                    thanh toán, bạn không phải nhập số thẻ thanh toán quốc tế
                    (VISA, Mastercard) vì đã cung cấp cho PayPal khi đăng ký tạo
                    tài khoản.
                  </p>
                </div>
              ) : currentStep == 3 && payment?.name == "MoMo" ? (
                <div className="lg:pt-24 sm:pt-2 ">
                  <img
                    src={QRmomo}
                    className="w-[360px] h-[450px] ml-[150px]"
                  />
                </div>
              ) : currentStep == 3 &&
                payment?.name == "Nhận hàng thanh toán" ? (
                <div className="lg:pt-64 sm:pt-2">
                  <p className="text-xl font-medium">Nhận hàng thanh toán</p>
                  <p className="text-black">
                    {" "}
                    Phương thức thanh toán truyền , nhận hàng và thanh toán cho
                    shipper
                  </p>
                </div>
              ) : (
                <></>
              )}
              {currentStep == 4 ? (
                <div></div>
              ) : (
                <>
                  <div className="mt-6 border-t border-b py-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        Tổng tiền sản phẩm
                      </p>
                      <p className="font-semibold text-gray-900">
                        {total.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                    </div>
                    {shipping ? (
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          Phí giao hàng
                        </p>
                        <p className="font-semibold text-[#6698ff]">
                          +{" "}
                          {shipping.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      Tổng thanh toán
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {totalprice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                </>
              )}
            </div>
            {currentStep == 3 && payment?.name == "Nhận hàng thanh toán" ? (
              <button
                // onClick={handerClickCheckOut}
                className="mt-4 mb-8 w-full rounded-md bg-[#6698ff] px-6 py-3 font-medium text-white "
              >
                Đặt hàng
              </button>
            ) : currentStep == 3 && payment?.name == "PayPal" ? (
              <PayPalScriptProvider
                options={{
                  components: "buttons",
                  "client-id":
                    "Ae_5iJYWFGJUR7mT3-KZaTj3U4O9uaxZE7Yy98NiKfXTCdkS7PrHW-NvljIMRfrWeXiSLFBwgcXEZrS7",
                }}
              >
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: paymentmanager(),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      if (details.status === "COMPLETED") {
                        handleOrder();
                      }
                    });
                  }}
                />
              </PayPalScriptProvider>
            ) : currentStep == 3 && payment?.name == "MoMo" ? (
              <button
                // onClick={handerClickCheckOut}
                className="mt-4 mb-8 w-full rounded-md bg-[#6698ff] px-6 py-3 font-medium text-white "
              >
                Chờ xác nhận nhé !!
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="pyro">
            <div className="before"></div>
            <div className="after"></div>
          </div>
          <div className="grid-flow-col flex justify-center">
            <p className="text-[30px] mt-10 font-bold">
              Đã đặt đơn hàng thành công
            </p>
            <div className="mt-4">
              <img src={gitcheck} width="60px" height="40px"></img>
            </div>
          </div>

          <Link to={"/sale"}>
            <button className="mt-4 mb-8 text-[15px] lg:w-[20%] sm:w-full md:w-1/3 rounded-md bg-[#fe2c6d] px-6 py-3 font-medium text-white  ">
              Tiếp tục mua hàng
            </button>
          </Link>
        </div>
      )}

      {!complete && (
        <div className="grid grid-flow-col justify-center p-4">
          {currentStep != 1 ? (
            <button
              className=" w-full rounded-md bg-[#6698ff] px-3 py-3 font-medium text-white "
              onClick={() => {
                setCurrentStep((prev) => prev - 1);
              }}
            >
              Trở về
            </button>
          ) : null}
          {currentStep === steps.length - 1 ? null : (
            <button
              className=" w-full rounded-md bg-[#6698ff] px-3 py-3 font-medium text-white ml-5"
              onClick={handerClicknext}
            >
              Tiếp tục
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Checkout;
