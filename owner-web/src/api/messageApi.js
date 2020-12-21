import axiosClient from "./axiosClient";

const token = sessionStorage.getItem("tokenAdmin");

const messageApi = {
  getListUser: () => {
    const url = "/admin/messages/owner";
    let config = {
      headers: {
        token: token,
      },
    };
    return axiosClient.get(url, config);
  },
  getMessage: (ownerID) => {
    const url = `/admin/${ownerID}/messages/?page=0&length=10`;
    let config = {
      headers: {
        token: token,
      },
    };
    return axiosClient.get(url, config);
  },
};

export default messageApi;
