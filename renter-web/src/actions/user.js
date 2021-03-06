import userApi from "../api/userApi";

export const loadUser = () => {
  return async (dispatch) => {
    try {
      const user = await userApi.getInfoRenter();
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
