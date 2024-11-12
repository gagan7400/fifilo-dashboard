export const pageAction = (data) => async (dispatch) => {
    let f = data;
     dispatch({ type: "PAGEDATA", payload: { ...f } });
};
