import axiosClient from "./axiosClient";

const token = sessionStorage.getItem("tokenOwner");

const config = {
  headers: {
    token: token,
  },
};

const userApi = {
  registerRenter: (renterData) => {
    const url = "/renter/sign-up/";
    return axiosClient.post(url, renterData);
  },

  registerOwner: (ownerData) => {
    const url = "/owner/sign-up/";
    return axiosClient.post(url, ownerData);
  },
  loginRenter: (renterData) => {
    const url = "/renter/login/";
    return axiosClient.post(url, renterData);
  },

  loginOwner: (ownerData) => {
    const url = "/owner/login/";
    return axiosClient.post(url, ownerData);
  },
  getInfoRenter: (id) => {
    const url = "/renter/" + id;
    return axiosClient.get(url);
  },
  getInfoOwner: (id) => {
    const url = "/owner/" + id;
    return axiosClient.get(url);
  },
  getNotification: () => {
    const url = "/owner/notification/";
    return axiosClient.get(url, config);
  },
  putPassword: (password) => {
    const url = "/owner/password";
    let body = password;
    console.log(body);
    return axiosClient.put(url, body, config);
  },
};

export default userApi;
