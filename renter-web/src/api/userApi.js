import axiosClient from "./axiosClient";

const token = sessionStorage.getItem("tokenRenter");

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
    let config = {
      headers: {
        token: token,
      },
    };
    return axiosClient.get(url, config);
  },
  getInfoOwner: (id) => {
    const url = "/owner/" + id;
    return axiosClient.get(url);
  },
  reportHouse: (id, title, content) => {
    const url = "/renter/report/" + id;
    let config = {
      headers: {
        token: token,
      },
    };
    let body = {
      content: content,
      title: title,
    };
    return axiosClient.post(url, body, config);
  },
};

export default userApi;
