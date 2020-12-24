import axiosClient from "./axiosClient";

const token = sessionStorage.getItem("tokenAdmin");

const statisticApi = {
  viewInHour: () => {
    const url = "/statistic/view-in-hour-this-month/";
    let config = {
      headers: {
        token: token,
      },
    };
    return axiosClient.get(url, config);
  },
};

export default statisticApi;
