import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import "./Carts.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { addItem, removeItem } from "../../redux/action/cartActions";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import emty from "../images/empty-cart.png";
// import { useNavigate } from "react-router-dom";

// import { useStateContext } from '../Context/CartContext';

const Carts = () => {
  const [totalPrices, setTotalPrices] = useState(0);
  const [total, setTotal] = useState(0);
  const [shipPrices, setShipPrices] = useState(30000);
  const [voucher, setVoucher] = useState();
  const [voucherPrices, setVoucherPrices] = useState(0);
  const [voucherTitle, setVoucherTitle] = useState("");

  const userData = localStorage.getItem("token") || "";
  const [userId, userEmail, userPassword] = userData.split(":");
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  let cartData = JSON.parse(localStorage.getItem("cartItems")) || [];

  const totalPrice = (price, qty) => {
    const total = price * qty;
    const formattedTotal = total.toLocaleString({
      style: "currency",
      currency: "VND",
    });
    return formattedTotal;
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartData.forEach((item) => {
      totalPrice += item.price * item.qty;
    });

    return totalPrice;
  };

  const calculateTotal = () => {
    let total = 0;
    total = totalPrices - voucherPrices;

    return total;
  };
  useEffect(() => {
    const totalPrice = calculateTotalPrice();
    setTotalPrices(totalPrice);
    const total = calculateTotal();
    window.localStorage.setItem("total", total);
    setTotal(total);
  }, [cartData]);

  const vouchers = [
    {
      ma: "123",
      dis: 10000,
    },
    {
      ma: "Ma1",
      dis: 15000,
    },
  ];

  const addVoucher = () => {
    const existingVoucher = vouchers.find(
      (vc) => vc.ma.toLowerCase() === voucher.toLowerCase()
    );

    if (existingVoucher) {
      setVoucherTitle(existingVoucher.ma);
      setVoucherPrices(existingVoucher.dis);
      toast("Voucher đã nhập thành công");
    } else {
      toast("Voucher không tồn tại");
    }
  };
  const handleRemoveFromCart = (id) => {
    dispatch(removeItem(id));
  };
  return cartData.length != 0 ? (
    <>
      <h1 className="justify-center text-center text-[50px] text-[#6698FF] font-bold">
        Giỏ hàng
      </h1>
      <div className="flex justify-center my-6">
        <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
          <div className="flex-1 ">
            <div className="overflow-x-scroll h-[400px]">
              <table
                className="w-full text-sm lg:text-base text-center"
                cellspacing="0"
              >
                <thead>
                  <tr className="h-12 uppercase text-center">
                    <th className="md:table-cell">Ảnh </th>
                    <th className="text-center">Sản phẩm</th>
                    <th className="lg:text-right text-left pl-5 lg:pl-0">
                      <span className="lg:hidden" title="Quantity">
                        Qtd
                      </span>
                      <span className="hidden lg:inline">Số lượng</span>
                    </th>
                    <th className="hidden text-right md:table-cell">Giá</th>
                    <th className="text-right">Tổng giá</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((item, index) => (
                    <tr key={item.product}>
                      <td className=" pb-4 md:table-cell ">
                        <a href="#">
                          <img
                            src={item.image}
                            className="w-20 h-20 rounded mx-auto rounded-lg shadow-lg"
                            alt="Thumbnail"
                          />
                        </a>
                      </td>
                      <td>
                        <p className="mb-2 md:text-center truncate max-w-[130px] mx-auto ">
                          {item.title}
                        </p>

                        <button className="text-gray-700 md:ml-4 ">
                          <small
                            onClick={() => {
                              dispatch(removeItem(item.product));
                              toast.success("Đã xóa sản phẩm");
                            }}
                            className="text-red-500 text-2xl"
                          >
                            <MdDelete />
                          </small>
                        </button>
                      </td>
                      <td className="justify-center md:justify-end md:flex mt-6">
                        <div className="w-20 h-10 ">
                          <div className="relative flex w-full h-8">
                            <input
                              type="text"
                              value={item.qty}
                              className="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black "
                              disabled
                            />
                          </div>
                          <div
                            className="inline-flex rounded-md shadow-sm w-20"
                            role="group"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                item.qty != 1
                                  ? dispatch(
                                      addItem(
                                        item.product,
                                        Number(item.qty - 1)
                                      )
                                    )
                                  : dispatch(removeItem(item.product));
                              }}
                              className="px-4 py-1 text-xl font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                            >
                              -
                            </button>
                            <button
                              onClick={() => {
                                dispatch(
                                  addItem(item.product, Number(item.qty + 1))
                                );
                                toast.success("Đã thay đổi số lượng");
                              }}
                              type="button"
                              className="px-4 py-1 text-xl font-medium text-gray-900 bg-white border border-gray-200 rounded-r-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="hidden text-right md:table-cell">
                        <span className="text-sm lg:text-base font-medium text-red-500">
                          {new Intl.NumberFormat({
                            style: "currency",
                            currency: "VND",
                          }).format(item.price)}{" "}
                          VNĐ
                        </span>
                      </td>
                      <td className="text-right">
                        <span className="text-sm lg:text-base font-medium text-red-500">
                          {totalPrice(item.price, item.qty)} VNĐ
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <hr className="pb-6 mt-6" />
            <div className="my-4 mt-6 -mx-2 lg:flex">
              <div className="lg:px-2 lg:w-1/2">
                <div className="p-2 bg-gray-100 rounded-full">
                  <p className="ml-2 text-lg mt-3 font-bold uppercase text-[#6698FF] text-center">
                    Mã giảm giá
                  </p>
                </div>
                <div className="p-4">
                  <p className="mb-4 italic">
                    Nếu bạn có mã giảm giá, vui lòng nhập vào ô bên dưới
                  </p>
                  <div className="justify-center md:flex">
                    <div className="flex items-center w-full h-13 pl-3 bg-white bg-gray-100 border rounded-full">
                      <input
                        onChange={(e) => setVoucher(e.target.value)}
                        type="coupon"
                        name="code"
                        id="coupon"
                        placeholder="Nhập Voucher"
                        className="w-full bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none"
                      />
                      <button
                        onClick={addVoucher}
                        className="text-sm flex items-center px-3 py-1 text-white bg-gray-800 rounded-full outline-none md:px-4 hover:bg-gray-700 focus:outline-none active:outline-none"
                      >
                        <svg
                          aria-hidden="true"
                          data-prefix="fas"
                          data-icon="gift"
                          className="w-8"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z"
                          />
                        </svg>
                        <span className="font-medium">Thêm mã giảm giá</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:px-2 lg:w-1/2">
                <div className="p-2 bg-gray-100 rounded-full text-center">
                  <p className="ml-2 mt-3 text-lg font-bold uppercase text-[#6698FF]">
                    Tổng tiền
                  </p>
                </div>
                <div className="p-4">
                  <p className="mb-6  italic">
                    Chi phí vận chuyển và chi phí bổ sung được tính toán dựa
                    trên các giá trị bạn đã nhập
                  </p>
                  <div className="flex justify-between border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      Tổng tiền sản phẩm
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      <span className="text-red-500">
                        {new Intl.NumberFormat({
                          style: "currency",
                          currency: "VND",
                        }).format(totalPrices)}{" "}
                        VNĐ
                      </span>
                    </div>
                  </div>

                  {/* <div className="flex justify-between pt-4 border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      Chi phí vận chuyển
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      <span className="text-red-500">
                        {new Intl.NumberFormat({
                          style: "currency",
                          currency: "VND",
                        }).format(shipPrices)}{" "}
                        VNĐ
                      </span>
                    </div>
                  </div> */}
                  {voucherPrices != 0 ? (
                    <div className="flex justify-between pt-4 border-b">
                      <div className="flex lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-gray-800">
                        <button
                          onClick={() => setVoucherPrices(0)}
                          className="mr-2 mt-1 lg:mt-2"
                        >
                          <svg
                            aria-hidden="true"
                            data-prefix="far"
                            data-icon="trash-alt"
                            className="w-4 text-red-600 hover:text-red-800"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path
                              fill="currentColor"
                              d="M268 416h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12zM432 80h-82.41l-34-56.7A48 48 0 00274.41 0H173.59a48 48 0 00-41.16 23.3L98.41 80H16A16 16 0 000 96v16a16 16 0 0016 16h16v336a48 48 0 0048 48h288a48 48 0 0048-48V128h16a16 16 0 0016-16V96a16 16 0 00-16-16zM171.84 50.91A6 6 0 01177 48h94a6 6 0 015.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12z"
                            />
                          </svg>
                        </button>
                        Mã giảm giá "{voucherTitle}"
                      </div>
                      <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-green-600">
                        -
                        {new Intl.NumberFormat({
                          style: "currency",
                          currency: "VND",
                        }).format(voucherPrices)}{" "}
                        VNĐ
                      </div>
                    </div>
                  ) : null}

                  <div className="flex justify-between pt-4 border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      Tổng thanh toán
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      <span className="text-red-500">
                        {new Intl.NumberFormat({
                          style: "currency",
                          currency: "VND",
                        }).format(total)}{" "}
                        VNĐ
                      </span>
                    </div>
                  </div>
                  <a href="#">
                    {" "}
                    <Link to={"/checkout"}>
                      <button class="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                        <svg
                          className="text-white"
                          aria-hidden="true"
                          data-prefix="far"
                          data-icon="credit-card"
                          className="w-8"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"
                          ></path>
                        </svg>
                        <span className="ml-2 mt-1 text-white">Thanh toán</span>
                      </button>{" "}
                    </Link>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="flex justify-center">
      <img
        src={emty}
        className="lg:h-[600px] lg:w-[800px] animate-pulse hover:skew-y-3 "
      />
    </div>
  );
};

export default Carts;
