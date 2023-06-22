import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getCateCategories = async () => {
    const response = await axios.get(`${base_url}categorycontainer/`);

    return response.data;
};

const catecontainerService = {
    getCateCategories,
};

export default catecontainerService;