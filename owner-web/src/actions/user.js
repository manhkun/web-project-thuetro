import userApi from "../api/userApi";

export const loadUser = () => {
  const ownerID = sessionStorage.getItem("ownerID");
  return async (dispatch) => {
    try {
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
