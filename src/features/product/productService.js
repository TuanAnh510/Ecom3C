import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url, base_url_vercel } from "../../utils/baseUrl";
const getProductsAll = async () => {
  const response = await axios.get(`${base_url_vercel}products/getall`);
  return response.data.products;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);
  return response.data;
};

const productService = {
  getProductsAll,
  createProduct,
};

export default productService;
