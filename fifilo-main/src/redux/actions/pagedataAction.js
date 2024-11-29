export const pageAction = (data) => async (dispatch) => {
    let f = data;
    localStorage.setItem("currentpagedata", JSON.stringify({ ...f }));
    dispatch({ type: "PAGEDATA", payload: { ...f } });
};
export const oldData = () => async (dispatch) => {
    console.log("oldda")
    let newdata = JSON.parse(localStorage.getItem("currentpagedata"));
    dispatch({ type: "OLDDATA", payload: { ...newdata } });
};
