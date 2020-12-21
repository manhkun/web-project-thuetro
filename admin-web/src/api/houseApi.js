import axiosClient from "./axiosClient";

const token = sessionStorage.getItem("tokenAdmin");

const houseApi = {
  postHouse: (data, token) => {
    const url = "/admin/house/";
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
  getAllHouse: () => {
    const url = "/house/";
    return axiosClient.get(url);
  },

  getHouseByOwnerID: (id) => {
    const url = `/owner/${id}/houses/`;
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

  getHousePending: () => {
    const url = "/admin/wait-houses/";
    let config = {
      headers: {
        token: token,
      },
    };
    return axiosClient.get(url, config);
  },

  getDeniedHouse: () => {
    const url = "/admin/denied-houses/";
    let config = {
      headers: {
        token: token,
      },
    };
    return axiosClient.get(url, config);
  },
  getReportHouse: () => {
    const url = "/admin/reports?page=0&length=10&status=0";
    let config = {
      headers: {
        token: token,
      },
    };
    return axiosClient.get(url, config);
  },

  acceptHouse: (id) => {
    const url = "/admin/active-house/?houseID=" + id;
    let config = {
      headers: {
        token: token,
      },
    };
    return axiosClient.post(url, {}, config);
  },
  denyHouse: (id, reason) => {
    const url = "/admin/denied-house/";
    let config = {
      headers: {
        token: token,
      },
    };
    let body = {
      comment: reason,
      house_id: id,
    };
    return axiosClient.post(url, body, config);
  },
  getListComment: (id) => {
    const url = `/admin/${id}/comments/`;
    let config = {
      headers: {
        token: token,
      },
    };
    return axiosClient.get(url, config);
  },
  acceptComment: (id) => {
    const url = "/admin/active-comment/?commentID=" + id;
    let config = {
      headers: {
        token: token,
      },
    };
    return axiosClient.post(url, {}, config);
  },
  deleteComment: (id) => {
    const url = "/comment/" + id;
    let config = {
      headers: {
        token: token,
      },
    };
    return axiosClient.delete(url, config);
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
};

export default houseApi;
