import { useEffect, useState } from "react";
import axios from "axios";
import Path from "./path";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getBrandsSlugCTN } from "../../features/brand/brandSlice";
import { getCategorysSlugCTN } from "../../features/pcategory/pcategorySlice";
import imgerror from "../images/imgerror.png";
import { toast } from "react-toastify";
const Filters = (props) => {
  const { id } = useParams();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFiterCate, setIsFiterCate] = useState(false);
  const visiblePageCount = 3;
  const startPage = Math.max(currentPage - Math.floor(visiblePageCount / 2), 1);
  const endPage = Math.min(startPage + visiblePageCount - 1, totalPages);
  const dispatch = useDispatch();
  useEffect(() => {
    const calldata = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}products/fitercontainerslug?page=${currentPage}&slug=${id}`
        )
        .then((response) => {
          setProducts(response.data.products);
          setTotalPages(response.data.totalPages);
          const totalpage = response.data.totalPages;
          if (totalpage) {
            let pageNumbers = [];
            for (let i = 1; i <= totalpage; i++) {
              pageNumbers.push(i);
            }
          }
        });
    };

    calldata();
  }, [currentPage, id]);

  useEffect(() => {
    dispatch(getBrandsSlugCTN(id));
    dispatch(getCategorysSlugCTN(id));
  }, [id]);

  const brandState = useSelector((state) => state.brand.Brands);
  const pCategoryState = useSelector((state) => state.pCategory.pCategories);

  function categoryProduct(item) {
    const categoryProduct = pCategoryState.find(
      (category) => category._id === item
    );

    if (categoryProduct) return categoryProduct.name;
  }

  const handleClick = (page) => {
    handlePageChange(page);
  };

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    }
  };

  const handlefilterButtonClick = () => {
    const categoryString = selectedCategories.join(",");
    const brandString = selectedBrands.join(",");

    if (categoryString.length == 0 && brandString.length == 0) {
      toast.error("Hãy chọn danh mục hoặc nhãn hàng cầm lọc");
    } else {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}products/fitercategory?categories=${categoryString}&brands=${brandString}`
        )
        .then((response) => {
          const datars = response.data.fproducts;
          if (datars.length !== 0) {
            setProducts(response.data.fproducts);
            setIsFiterCate(true);
          } else toast.error("Không tìm thấy sản phẩm lọc");
        })
        .catch((error) => {
          toast.error("Đã xảy ra lỗi");
        });
    }
  };

  const renderPages = () => {
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    ).map((page) => (
      <li key={page}>
        <button
          className={`px-3 py-2 leading-tight text-gray-500 bg-white border ${
            currentPage === page
              ? "bg-gray-100 text-gray-700"
              : "border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          }`}
          onClick={() => handleClick(page)}
        >
          {page}
        </button>
      </li>
    ));
  };

  return (
    <>
      <div className="containers">
        <Path data="" />

        <section>
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col md:flex-row -mx-4">
              <aside className="md:w-1/3 lg:w-1/4 px-4 py-4">
                <div className="md:hidden mb-5  w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600">
                  Lọc sản phẩm
                </div>

                <div className=" md:block px-6 pt-4 bg-color-card rounded-md shadow ">
                  <h3 className="font-semibold mb-2 text-color-title">
                    Danh mục
                  </h3>

                  <ul className="space-y-1">
                    {pCategoryState.map((category) => (
                      <li key={category._id}>
                        <div className="flex items-center">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            value={category._id}
                            onChange={handleCategoryChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "
                          />
                          <label
                            for="checked-checkbox"
                            className="ml-2 text-sm font-medium text-gray-900 "
                          >
                            {category.name}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <hr className="my-4 text-color-basic" />
                  <h3 className="font-semibold mb-2 text-color-title">
                    Nhãn hàng
                  </h3>
                  <ul className="space-y-1">
                    {brandState.map((brand) => (
                      <li key={brand._id}>
                        <div className="flex items-center">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            onChange={handleBrandChange}
                            value={brand._id}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2  "
                          />
                          <label
                            for="checked-checkbox"
                            className="ml-2 text-sm font-medium text-gray-900 "
                          >
                            {brand.title}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <hr className="my-1" />

                  <button
                    className="bg-color-button hover:bg-blue-400 text-text-color font-bold py-2 px-4 border border-black rounded my-2 "
                    onClick={handlefilterButtonClick}
                  >
                    <FontAwesomeIcon icon={faFilter} /> Lọc
                  </button>
                </div>
              </aside>
              <main className="md:w-2/3 lg:w-3/4 w-4/4 px-3">
                <div className="mt-4 grid gap-y-10 gap-x-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {products.map((item) => (
                    <div
                      key={item._id}
                      className="group relative bg-color-card rounded-md shadow overflow-hidden"
                    >
                      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-color-basic group-hover:opacity-75 lg:aspect-none lg:h-50">
                        <img
                          src={
                            item.imagesDefault
                              ? item.imagesDefault.secure_url
                              : imgerror
                          }
                          className="h-[300px] w-full object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                      <hr className="w-[80%] mx-auto" />
                      <div className="mt-2 flex justify-center pl-[10px] py-1 overflow-hidden">
                        <div>
                          <p className="mt-1 text-sm text-text-color opacity-60  text-center">
                            {categoryProduct(item.idCategory)}
                          </p>
                          <h3 className="text-sm text-text-color text-center">
                            <Link to={`/productdetail/${item._id}`}>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              <p>{item.name}</p>
                              <p className="inline-block mb-6 text-text-color  ">
                                <span>Giá: </span>
                                {item.price != 0 ? (
                                  <span className="text-red-600 font-bold">
                                    {new Intl.NumberFormat({
                                      style: "currency",
                                      currency: "VND",
                                    }).format(item.price)}{" "}
                                    VNĐ
                                  </span>
                                ) : (
                                  <span className="text-red-600 font-bold">
                                    {new Intl.NumberFormat({
                                      style: "currency",
                                      currency: "VND",
                                    }).format(0)}{" "}
                                    VNĐ
                                  </span>
                                )}
                              </p>
                            </Link>
                          </h3>
                        </div>
                        {/* <p className="text-sm font-medium text-gray-900">{product.price}</p> */}
                      </div>

                      <div>
                        <Link to={`/productdetail/${item._id}`}>
                          <button
                            type="button"
                            className="bg-color-button hover:bg-blue-400 text-text-color font-bold py-2 px-4 text-center mr-2  w-[100%] rounded-none "
                          >
                            <FontAwesomeIcon icon={faMagnifyingGlass} /> Xem
                            thêm
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </main>
            </div>
          </div>
        </section>
      </div>
      <br />
      {isFiterCate === true ? (
        <div> </div>
      ) : (
        <div className="containers justify-center flex items-center ">
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px ">
              <li>
                <button
                  href="#"
                  aria-current="page"
                  className={`px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-700"
                      : "border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  } rounded-l-lg`}
                  onClick={() => handleClick(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Trở về
                </button>
              </li>
              {renderPages()}
              <li>
                <button
                  href="#"
                  className={`px-3 py-2 leading-tight text-gray-500 bg-white border ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-700"
                      : "border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  } rounded-r-lg`}
                  onClick={() => handleClick(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};
export default Filters;
