import axiosClient from "./axiosClient";

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
};

export default userApi;
