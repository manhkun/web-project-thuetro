import axiosClient from "./axiosClient";

const token = sessionStorage.getItem("tokenAdmin");

const userApi = {
  getInfoRenter: (id) => {
    const url = "/renter/" + id;
    return axiosClient.get(url);
  },
  getInfoOwner: (id) => {
    const url = "/owner/" + id;
    return axiosClient.get(url);
  },
  loginAdmin: (data) => {
    const url = "/admin/login/";
    return axiosClient.post(url, data);
  },

  getAllOwner: () => {
    const url = "/admin/owners/";
    let config = {
      headers: {
        token: token,
      },
    };
    return axiosClient.get(url, config);
  },

  activeOwner: (id) => {
    const url = "/admin/active-owner/?ownerID=" + id;
    let config = {
      headers: {
        token: token,
      },
    };
    return axiosClient.post(url, {}, config);
  },

  deleteOwner: (id) => {
    const url = "/admin/owner/?ownerID=" + id;
    let config = {
      headers: {
        token: token,
      },
    };
    return axiosClient.delete(url, config);
  },
};

export default userApi;
