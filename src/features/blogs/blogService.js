import axios from "axios";
import { base_url } from "../../utils/baseUrl";


const getBlogs = async (keyWord) => {
  const response = await axios.get(`${base_url}blog/search?keyword=${keyWord}`);

  return response.data;
};

const blogService = {
  getBlogs,
};

export default blogService;
