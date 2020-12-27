import axiosClient from "./axiosClient";

const token = sessionStorage.getItem("tokenAdmin");

const config = {
  headers: {
    token: token,
  },
};

const messageApi = {
  getListUser: () => {
    const url = "/admin/messages/owner";
    return axiosClient.get(url, config);
  },
  getMessage: (ownerID) => {
    const url = `/admin/${ownerID}/messages/?page=0&length=10`;
    return axiosClient.get(url, config);
  },
  sendMessage: (id, message) => {
    const url = "/admin/messages/owner";
    let body = {
      image_link: "",
      message: message,
      owner_id: id,
    };
    return axiosClient.post(url, body, config);
  },
};

export default messageApi;
