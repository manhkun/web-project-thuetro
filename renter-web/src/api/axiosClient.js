import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "https://812b557ed0f0.ngrok.io/v1/rent-house",
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
