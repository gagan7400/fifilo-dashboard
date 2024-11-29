import axios from "axios";
// Login 
export const loaduser = () => async (dispatch) => {
  dispatch({ type: "LOAD_USER" })
}
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`http://localhost:5000/admin/login`,
      { email, password },
      config
    );
    console.log(data)
    await localStorage.setItem("token", data.token)
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
  } catch (error) {
    console.log(error.message)
    dispatch({ type: "LOGIN_FAIL", payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "LOGOUT_SUCCESS" });
};
