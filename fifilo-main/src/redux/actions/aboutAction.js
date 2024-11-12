// import axios from 'axios'

// // aboutpage 
// export const getAboutPage = () => async (dispatch) => {
//     try {
//         dispatch({ type: "ALL_ABOUTPAGE_REQUEST" });
//         const { data } = await axios.get('http://localhost:5000/admin/about/getaboutpage');
//         dispatch({
//             type: "ALL_ABOUTPAGE_SUCCESS",
//             payload: data.data,
//         });
//     } catch (error) {
//         dispatch({
//             type: "ALL_ABOUTPAGE_FAIL",
//             payload: error.response.data.message,
//         });
//     }
// };
// export const publishAboutPage = (id) => async (dispatch) => {
//     try {
//         dispatch({ type: "ALL_PUBLISHABOUTPAGE_REQUEST" });
//         const config = {
//             headers: {
//                 "Content-Type": "application/json",
//                 "x-auth-token": localStorage.getItem("token")
//             }
//         };

//         const { data } = await axios.put(`http://localhost:5000/admin/about/publishaboutpage/${id}`, {}, config);
//         dispatch({
//             type: "ALL_PUBLISHABOUTPAGE_SUCCESS",
//             payload: data,
//         });
//         dispatch(getPublishAboutPage())
//         dispatch(getAboutPage())
//     } catch (error) {
//         dispatch({
//             type: "ALL_PUBLISHABOUTPAGE_FAIL",
//             payload: error.response.data.message,
//         });
//     }
// };
// export const getPublishAboutPage = () => async (dispatch) => {
//     try {
//         dispatch({ type: "ALL_GETPUBLISHABOUTPAGE_REQUEST" });


//         const { data } = await axios.get('http://localhost:5000/admin/about/getpublishedaboutpage');

//         dispatch({
//             type: "ALL_GETPUBLISHABOUTPAGE_SUCCESS",
//             payload: data.data,
//         });
//     } catch (error) {
//         dispatch({
//             type: "ALL_GETPUBLISHABOUTPAGE_FAIL",
//             payload: error.response.data.message,
//         });
//     }
// };

// export const deleteAboutPage = (id) => async (dispatch) => {
//     try {
//         dispatch({ type: "DELETE_ABOUTPAGE_REQUEST" });
//         const config = {
//             headers: {
//                 "x-auth-token": localStorage.getItem("token")
//             }
//         };
//         const { data } = await axios.delete(`http://localhost:5000/admin/about/deleteaboutpage/${id}`, config);
//         await dispatch({
//             type: "DELETE_ABOUTPAGE_SUCCESS",
//             payload: data.data,
//         });
//         dispatch(getAboutPage());
//     } catch (error) {
//         dispatch({
//             type: "DELETE_ABOUTPAGE_FAIL",
//             payload: error.response.data.message,
//         });
//     }
// };


// export const updateAboutPageAction = ({ aboutdata, id }) => async (dispatch) => {
//     try {
//         dispatch({ type: "UPDATE_ABOUTPAGE_REQUEST" });
//         const config = {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//                 "x-auth-token": localStorage.getItem("token")
//             }
//         };
//         const { data } = await axios.put(`http://localhost:5000/admin/about/updateaboutpage/${id}`,
//             aboutdata,
//             config
//         );
//         dispatch({
//             type: "UPDATE_ABOUTPAGE_SUCCESS",
//             payload: data._id,
//         });
//         dispatch(getAboutPage())
//     } catch (error) {
//         dispatch({
//             type: "UPDATE_ABOUTPAGE_FAIL",
//             payload: error,
//         });
//     }
// };

import axios from 'axios';

// Helper function for headers configuration
const getAuthConfig = (isMultipart = false) => ({
    headers: {
        "x-auth-token": localStorage.getItem("token"),
        ...(isMultipart && { "Content-Type": "multipart/form-data" }),
        ...(!isMultipart && { "Content-Type": "application/json" }),
    },
});

// Optimized Actions

export const getAboutPage = () => async (dispatch) => {
    try {
        dispatch({ type: "ALL_ABOUTPAGE_REQUEST" });
        const { data } = await axios.get('http://localhost:5000/admin/about/getaboutpage');
        dispatch({ type: "ALL_ABOUTPAGE_SUCCESS", payload: data.data });
    } catch (error) {
        dispatch({ type: "ALL_ABOUTPAGE_FAIL", payload: error.response.data.message });
    }
};

export const publishAboutPage = (id) => async (dispatch) => {
    try {
        dispatch({ type: "ALL_PUBLISHABOUTPAGE_REQUEST" });
        const { data } = await axios.put(
            `http://localhost:5000/admin/about/publishaboutpage/${id}`,
            {},
            getAuthConfig()
        );
        dispatch({ type: "ALL_PUBLISHABOUTPAGE_SUCCESS", payload: data });
        dispatch(getAboutPage());
    } catch (error) {
        dispatch({ type: "ALL_PUBLISHABOUTPAGE_FAIL", payload: error.response.data.message });
    }
};

export const getPublishAboutPage = () => async (dispatch) => {
    try {
        dispatch({ type: "ALL_GETPUBLISHABOUTPAGE_REQUEST" });
        const { data } = await axios.get('http://localhost:5000/admin/about/getpublishedaboutpage');
        dispatch({ type: "ALL_GETPUBLISHABOUTPAGE_SUCCESS", payload: data.data });
    } catch (error) {
        dispatch({ type: "ALL_GETPUBLISHABOUTPAGE_FAIL", payload: error.response.data.message });
    }
};

export const deleteAboutPage = (id) => async (dispatch) => {
    try {
        dispatch({ type: "DELETE_ABOUTPAGE_REQUEST" });
        const { data } = await axios.delete(
            `http://localhost:5000/admin/about/deleteaboutpage/${id}`,
            getAuthConfig()
        );
        dispatch({ type: "DELETE_ABOUTPAGE_SUCCESS", payload: id });

    } catch (error) {
        dispatch({ type: "DELETE_ABOUTPAGE_FAIL", payload: error.response.data.message });
    }
};

export const updateAboutPageAction = ({ aboutData, id }) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_ABOUTPAGE_REQUEST" });
        const { data } = await axios.put(
            `http://localhost:5000/admin/about/updateaboutpage/${id}`,
            aboutData,
            getAuthConfig(false)
        );
        dispatch({ type: "UPDATE_ABOUTPAGE_SUCCESS", payload: data._id });
        dispatch(getAboutPage());
    } catch (error) {
        dispatch({ type: "UPDATE_ABOUTPAGE_FAIL", payload: error.response.data.message });
    }
};
