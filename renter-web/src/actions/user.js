import userApi from "../api/userApi";

export const loadUser = () => {
  const renterID = sessionStorage.getItem("tokenRenter");
  console.log("Load user action");
  return async (dispatch) => {
    try {
      const user = await userApi.getInfoRenter(renterID);
      dispatch(addNewUser(user.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addNewUser = (user) => {
  return {
    type: "ADD_USER",
    payload: user,
  };
};
export const logout = () => {
  return {
    type: "LOG_OUT",
    payload: {},
  };
};
