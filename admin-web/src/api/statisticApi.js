import axiosClient from "./axiosClient";

const token = sessionStorage.getItem("tokenAdmin");

const config = {
  headers: {
    token: token,
  },
};

const statisticApi = {
  getTimeLine: () => {
    const url = "/statistic/timeline-this-month/";
    return axiosClient.get(url, config);
  },
  getMostView: () => {
    const url = "/statistic/most-view-this-month/?length=10";
    return axiosClient.get(url, config);
  },
  getMostLike: () => {
    const url = "/house/favorite-desc?page=0&count=10";
    return axiosClient.get(url);
  },
  getMostSearchPrice: () => {
    const url = "/statistic/view-by-price/";
    return axiosClient.get(url, config);
  },
  getMostSearchPlace: () => {
    const url = "/statistic/view-in-location/?length=5";
    return axiosClient.get(url, config);
  },
};

export default statisticApi;
