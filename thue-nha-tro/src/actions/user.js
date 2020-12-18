import userApi from "../api/userApi";

export const loadUser = () => {
  const renterID = sessionStorage.getItem("renterID");
  const ownerID = sessionStorage.getItem("ownerID");
  console.log("Load user action");
  return async (dispatch) => {
    try {
      if (renterID) {
        const user = await userApi.getInfoRenter(renterID);
        dispatch(addNewUser(user.data));
      }
      if (ownerID) {
        const user = await userApi.getInfoOwner(ownerID);
        dispatch(addNewUser(user.data));
      }
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
