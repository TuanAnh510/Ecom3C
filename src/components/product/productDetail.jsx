// import { products } from "../data/Data";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import Path from "./path";
import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import axios from "axios";
import ShowFeedBack from "./showFeedback";
import FeedBack from "./feedback";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Square3Stack3DIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addItem } from "../../redux/action/cartActions";
import LoadingPage from "../loadingPage/LoadingPage";

const ProductDetail = () => {
  const id = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([]);
  const { cart } = useSelector((state) => state.cart);
  const [dataCate, setDataCate] = useState([]);
  const [product, setProduct] = useState(null);
  const [brands, setBrands] = useState([]);
  const [zalo, setZalo] = useState([]);
  const [fb, setfb] = useState([]);
  const [gmail, setGmail] = useState([]);
  const [priceformat, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  //auth
  const { isauth } = useSelector((store) => store.login);

  const dispatch = useDispatch();
  const onSlide = (currentIndex) => {
    setCurrentIndex(currentIndex);
  };

  useEffect(() => {
    const calldata = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}products/getall`)
        .then((response) => {
          const pro = response.data.products;
          setData(pro);
        });
    };

    const calldata2 = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}category/`)
        .then((response) => {
          setDataCate(response.data.category);
        });
    };
    const calldata3 = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}brand/`)
        .then((response) => {
          const data = response.data;
          setBrands(data);
        });
    };

    calldata();
    calldata2();
    calldata3();
  }, []);

  useEffect(() => {
    const foundProduct = data.find((p) => p._id == Number(id.id));
    setProduct(foundProduct);
  });

  function categoryProduct(item) {
    const categoryProduct = dataCate.find((category) => category._id === item);

    if (categoryProduct) return categoryProduct.name;
  }

  function brandProduct(item) {
    const brandProduct = brands.find((brand) => brand._id === item);

    if (brandProduct) return brandProduct.title;
  }

  useEffect(() => {
    const getInfoweb = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}info/`)
        .then((response) => {
          setZalo(response.data[0].zalo);
          setfb(response.data[0].facebook);
          setGmail(response.data[0].gmail);
        });
    };
    getInfoweb();
  }, []);

  const getDescription = (item) => {
    if (item) {
      return {
        __html: item.replace(/\r?\n/g, ""),
      };
    }
  };
  const handleAddToCart = (e) => {
    if (quantity && id.id) {
      dispatch(addItem(id.id, Number(quantity)));
      toast.success("Sản phẩm đã được thểm vào giỏ hàng");
    }
  };
  return (
    <div>
      <>
        {product == null ? (
          <LoadingPage size={32} />
        ) : (
          <div>
            <div className="containers">
              <Path data={product.name} />
            </div>
            <section className="overflow-hidden bg-white py-7 ">
              <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
                <div className="flex flex-wrap -mx-4">
                  <div className="w-full mb-8 md:w-1/2 md:mb-0">
                    <div className="sticky top-0 z-30 overflow-hidden ">
                      <ImageGallery
                        loading={"lazy"}
                        thumbnailHeight={50}
                        items={product.imagesDetail}
                        showFullscreenButton={true}
                        useBrowserFullscreen={true}
                        onSlide={onSlide}
                        thumbnailPosition={"left"}
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2 ">
                    <div className="lg:pl-20">
                      <div className="mb-8 ">
                        <h2 className="max-w-xl mb-6 text-3xl font-bold md:text-4xl text-color-title">
                          {product.name}
                        </h2>
                        <p className="inline-block mb-1 text-md text-gray-700  ">
                          Danh mục:{" "}
                          <span className="text-md font-bold text-text-color">
                            {categoryProduct(product.idCategory)}
                          </span>
                        </p>
                        <br />
                        <p className="inline-block mb-1 text-md text-gray-700 ">
                          Nhãn hàng:{" "}
                          <span className="text-md font-bold text-text-color">
                            {brandProduct(product.idBrand)}
                          </span>
                        </p>
                        <br />
                        <p className="inline-block mb-1 text-md text-gray-700 ">
                          Số lượng:{" "}
                          <span className="text-md font-bold text-text-color">
                            {product.quantity}
                          </span>
                        </p>
                        <br />
                        <p className="inline-block mb-1 text-md text-gray-700 ">
                          Đã bán:{" "}
                          <span className="text-md font-bold text-text-color">
                            {product.sold}
                          </span>
                        </p>
                        <div>
                          <p className="inline-block text-md text-gray-700  ">
                            Giá:{" "}
                            <span className="text-red-600 text-xl font-bold">
                              {new Intl.NumberFormat({
                                style: "currency",
                                currency: "VND",
                              }).format(product.price)}{" "}
                              VNĐ
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="mb-8 pt-[20px] flex">
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[120px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        >
                          <option selected>Chọn số lượng</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                        &nbsp;
                        <div>
                          <div className="flex flex-wrap -mb-2">
                            {product.quantity == 0 ? (
                              <button
                                disabled
                                className="px-4 py-2 mb-2 mr-4 disabled:opacity-50 disabled:cursor-not-allowed font-semibold border rounded-md hover:border-blue-400 hover:text-black bg-color-button text-text-color"
                              >
                                Hết hàng
                              </button>
                            ) : isauth == true ? (
                              <button
                                onClick={handleAddToCart}
                                className="px-4 py-2 mb-2 mr-4 font-semibold border rounded-md hover:border-blue-400 hover:text-black bg-color-button text-text-color"
                              >
                                Thêm vào giỏ hàng
                              </button>
                            ) : (
                              <Link
                                to="/login"
                                onClick={() =>
                                  toast.error("Bạn cần đăng nhập trước!")
                                }
                                className="px-4 py-2 mb-2 mr-4 font-semibold border rounded-md hover:border-blue-400 hover:text-black bg-color-button text-text-color"
                              >
                                Đăng nhập
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mb-8">
                        <h2 className=" pb-1 mb-4 text-2xl font-bold border-b border-blue-300 ">
                          Liên hệ
                        </h2>
                        <div className="flex flex-wrap -mx-2 -mb-2">
                          <a href={zalo}>
                            <button className="p-1 mb-2 mr-3 bg-blue-800 rounded-full">
                              <SiZalo className="w-6 h-6 text-white" />
                            </button>
                          </a>
                          <a href={fb}>
                            <button className="p-1 mb-2 mr-3 bg-blue-800 rounded-full">
                              <FaFacebookF className="w-6 h-6 text-white" />
                            </button>
                          </a>
                          <a href={`mailto:${gmail}`}>
                            <button className="p-1 mb-2 mr-3 bg-blue-800 rounded-full">
                              <HiOutlineMail className="w-6 h-6 text-white" />
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-6 mt-6 border-t w-[100%] border-gray-300 ">
                    <Tabs value="mota">
                      <TabsHeader>
                        <Tab value="mota">Mô tả</Tab>
                        <Tab value="danhgia" className="z-30">
                          Đánh giá
                        </Tab>
                      </TabsHeader>
                      <TabsBody
                        animate={{
                          initial: { y: 250 },
                          mount: { y: 0 },
                          unmount: { y: 250 },
                        }}
                      >
                        <TabPanel value="mota">
                          <span className="text-xl font-bold uppercase font-sans">
                            Mô tả sản phẩm
                          </span>
                          <br />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: `${product.description}`,
                            }}
                          ></div>
                        </TabPanel>
                      </TabsBody>
                      <TabsBody
                        animate={{
                          initial: { y: 250 },
                          mount: { y: 0 },
                          unmount: { y: 250 },
                        }}
                      >
                        <TabPanel value="danhgia">
                          <ShowFeedBack idproductfeedback={product._id} />
                          <FeedBack idproduct={product._id} />
                        </TabPanel>
                      </TabsBody>
                    </Tabs>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </>
    </div>
  );
};
export default ProductDetail;
