import axiosClient from "./axiosClient";

const token = sessionStorage.getItem("tokenOwner");

const config = {
  headers: {
    token: token,
  },
};

const houseApi = {
  postHouse: (data) => {
    const url = "/owner/house/";
    return axiosClient.post(url, data, config);
  },

  postImg: (files) => {
    const formData = new FormData();
    const url = "/house/images";
    files.map((file) => formData.append("files", file));
    return axiosClient.post(url, formData);
  },
  getInfoHouse: (id) => {
    const url = `/house/${id}`;
    return axiosClient.get(url);
  },
  getHouseByOwnerID: (id) => {
    const url = `/owner/${id}/houses/`;
    return axiosClient.get(url);
  },
  getAllHouse: (params) => {
    const url = "/house/page";
    return axiosClient.get(url, { params });
  },
  deleteHouse: (id) => {
    const url = `/house/${id}`;
    return axiosClient.delete(url, config);
  },
  editHouse: (data, id) => {
    const url = `/house/${id}`;
    return axiosClient.put(url, data, config);
  },
  getListComment: (id) => {
    const url = `/house/${id}/comments/`;
    return axiosClient.get(url);
  },
  expiredHouse: (id, time) => {
    const url = `/house/${id}/expired-time?time=${time}`;
    return axiosClient.put(url, {}, config);
  },
  searchHouse: (params) => {
    const url = "/search/page-search-results";
    return axiosClient.get(url, { params });
  },
  updateRentedHouse: (id) => {
    const url = `/house/${id}/rented`;
    return axiosClient.put(url, {}, config);
  },
};

export default houseApi;
