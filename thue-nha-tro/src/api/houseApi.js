import axiosClient from "./axiosClient";

const houseApi = {
  postHouse: (data, token) => {
    const url = "/owner/house/";
    let config = {
      headers: {
        token: token,
      },
    };
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
  getAllHouse: () => {
    const url = "/house/";
    return axiosClient.get(url);
  },
  deleteHouse: (id, token) => {
    const url = `/house/${id}`;
    let config = {
      headers: {
        token: token,
      },
    };
    return axiosClient.delete(url, config);
  },
  editHouse: (data, token, id) => {
    const url = `/house/${id}`;
    let config = {
      headers: {
        token: token,
      },
    };
    return axiosClient.put(url, data, config);
  },
  getListComment: (id) => {
    const url = `/house/${id}/comments/`;
    return axiosClient.get(url);
  },
};

export default houseApi;
