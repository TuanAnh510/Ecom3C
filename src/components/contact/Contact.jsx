import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [info, setInfo] = useState([]);
  var checkMail =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  const handelSubmitContact = async (e) => {
    e.preventDefault();
    if (
      name == "" ||
      email == "" ||
      description == "" ||
      phone == "" ||
      address == ""
    ) {
      toast.warning("Vui lòng không để trống thông tin");
      return;
    } else if (!checkMail.test(email) || email.length == "") {
      toast.warning("Email không hợp lệ");
      return;
    }
    await axios
      .post(`${process.env.REACT_APP_API_URL}contact/`, {
        name: name,
        email,
        email,
        phone: phone,
        address: address,
        description: description,
      })
      .then((data) => {
        if (data.data.status) {
          toast.success("Gửi biểu mẫu liên hệ thàng công");
          setName("");
          setEmail("");
          setPhone("");
          setAddress("");
          setDescription("");
        } else toast.danger("Lỗi");
      });
  };

  useEffect(() => {
    const getInfoweb = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}info/`)
        .then((response) => {
          setInfo(response.data);
        });
    };
    getInfoweb();
  }, []);
  return info.length != 0 ? (
    <>
      <section className="contact mb">
        <div className="containers ">
          <div className="shadow mt-4 mb-4 rounded-md bg-color-card overflow-auto">
            <h4 className="lg:text-left text-[40px] font-bold text-color-title pl-3">
              Vị trí
            </h4>{" "}
            <div className="flex flex-wrap p-4 ">
              <iframe
                className="rounded-lg"
                title="Map"
                src={info[0].iframeggmap}
                width="100%"
                height="450"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="flex flex-wrap ">
            <div className="relative sm:flex-grow sm:flex-1">
              <h1>THÔNG TIN LIÊN HỆ</h1> <br />
              <div>
                <p>
                  <b className="text-[15]">{info[0].nameweb}</b>
                  <p className="mt-5">
                    <b>Địa chỉ liên hệ:</b> {info[0].address}
                  </p>
                  <p className="mt-5">
                    <b>Điện thoại:</b> {info[0].hotline}
                  </p>
                </p>
              </div>
            </div>
            <div className="relative sm:flex-grow sm:flex-1">
              <div className="shadow rounded-md bg-color-card">
                <form onSubmit={handelSubmitContact}>
                  <h4 className="font-blod text-color-title text-[24px]">
                    Biểu mẫu liên hệ
                  </h4>{" "}
                  <br />
                  <div>
                    <input
                      type="text"
                      className="flex-grow border-gray-400 border-2 p-2 rounded-md mr-4 "
                      placeholder="Họ và tên"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="email"
                      className="flex-grow border-gray-400 border-2 p-2 rounded-md mr-4 "
                      placeholder="Địa chỉ email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      type="number"
                      className="flex-grow border-gray-400 border-2 p-2 rounded-md mr-4 "
                      placeholder="Số điện thoại"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                      type="text"
                      className="flex-grow border-gray-400 border-2 p-2 rounded-md mr-4 "
                      placeholder="Địa chỉ"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <textarea
                    cols="28"
                    rows="10"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <button className="bg-color-button w-[100%] rounded-md text-white">
                    Gửi liên hệ
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <></>
  );
};

export default Contact;
