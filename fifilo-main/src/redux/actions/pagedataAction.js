export const pageAction = (data) => async (dispatch) => {
    let f = data;
    if (data) {
        console.log(data)
        localStorage.setItem("currentpagedata", JSON.stringify({ ...f }));
        dispatch({ type: "PAGEDATA", payload: { ...f } });
    } else {
        dispatch({ type: "PAGEDATA", payload: JSON.parse(localStorage.getItem("currentpagedata")) });
    }
};
// export const oldData = () => async (dispatch) => {
//     console.log("oldda")
//     let newdata = JSON.parse(localStorage.getItem("currentpagedata"));
//     dispatch({ type: "OLDDATA", payload: { ...newdata } });
// };
