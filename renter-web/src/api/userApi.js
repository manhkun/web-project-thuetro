import axiosClient from "./axiosClient";

const token = sessionStorage.getItem("tokenRenter");

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
  loginRenter: (renterData) => {
    const url = "/renter/login/";
    return axiosClient.post(url, renterData);
  },
  getInfoRenter: () => {
    const url = "/renter/";
    return axiosClient.get(url, config);
  },
  getInfoOwner: (id) => {
    const url = "/owner/" + id;
    return axiosClient.get(url);
  },
  reportHouse: (id, title, content) => {
    const url = "/renter/report/" + id;

    let body = {
      content: content,
      title: title,
    };
    return axiosClient.post(url, body, config);
  },
  putPassword: (password) => {
    const url = "/renter/password";
    let body = password;
    return axiosClient.put(url, body, config);
  },
};

export default userApi;
