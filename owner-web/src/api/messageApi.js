import axiosClient from "./axiosClient";

const token = sessionStorage.getItem("tokenOwner");

const messageApi = {
  getMessage: () => {
    const url = `/owner/messages/?page=0&length=10`;
    let config = {
      headers: {
        token: token,
      },
    };
    return axiosClient.get(url, config);
  },
};

export default messageApi;
