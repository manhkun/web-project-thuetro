import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "http://5b31dc3aac6e.ngrok.io/v1/rent-house",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// axiosClient.defaults.headers.common['token'] = 'token';
axiosClient.interceptors.request.use(async (config) => {
  // handle token
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    //handle error
    throw error;
  }
);

export default axiosClient;
