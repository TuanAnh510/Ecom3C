import axios from "axios";
import { base_url } from "../../utils/baseUrl";


const getCategorysSlugCTNs = async (id) => {
  const response = await axios.get(`${base_url}category/finctn?slug=${id}`);

  return response.data;
};

const pCategoryService = {
  getCategorysSlugCTNs,
};

export default pCategoryService;
