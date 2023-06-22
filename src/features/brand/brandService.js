import axios from "axios";
import { base_url} from "../../utils/baseUrl";


const getBrandsSlugCTNs = async (slug) => {
  const response = await axios.get(`${base_url}brand/finctn?slug=${slug}`);

  return response.data;
};



const brandService = {
  getBrandsSlugCTNs,

};

export default brandService;
