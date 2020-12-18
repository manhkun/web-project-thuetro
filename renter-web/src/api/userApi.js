import axiosClient from "./axiosClient";

const userApi = {
  registerRenter: (renterData) => {
    const url = "/renter/sign-up/";
    return axiosClient.post(url, renterData);
  },
  loginRenter: (renterData) => {
    const url = "/renter/login/";
    return axiosClient.post(url, renterData);
  },
  getInfoRenter: (token) => {
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
};

export default userApi;
