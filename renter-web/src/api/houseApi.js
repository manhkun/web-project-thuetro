import axiosClient from "./axiosClient";

const token = sessionStorage.getItem("tokenRenter");

const houseApi = {
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
  getListFavorite: () => {
    const url = "/renter/favorite";
    let config = {
      headers: {
        token: token,
      },
    };
    return axiosClient.get(url, config);
  },
  commentHouse: (id, comment, vote) => {
    const url = "/renter/comment/" + id;
    let config = {
      headers: {
        token: token,
      },
    };
    let body = {
      content: comment,
      header: "",
      star: vote,
    };
    return axiosClient.post(url, body, config);
  },

  likeHouse: (id) => {
    const url = "/renter/like/" + id;
    let config = {
      headers: {
        token: token,
      },
    };
    return axiosClient.put(url, {}, config);
  },
  getListComment: (id) => {
    const url = `/house/${id}/comments/`;
    return axiosClient.get(url);
  },
  searchHouse: (params) => {
    const url = "/search/page-search-results";
    return axiosClient.get(url, { params });
  },
};

export default houseApi;
