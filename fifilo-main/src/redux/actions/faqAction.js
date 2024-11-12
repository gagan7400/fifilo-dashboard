import axios from 'axios'

export const createFaqPage = ({ heroSection, faqSection }) => async (dispatch) => {
    try {
        dispatch({ type: "CREATE_FAQPAGE_REQUEST" });
        await fetch("http://localhost:5000/admin/faq/createfaqpage", {
            method: 'POST',
            body: JSON.stringify({ heroSection, faqSection }),
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        }).then((r) => r.json()).then((res) => {
            console.log(res);
            dispatch({
                type: "CREATE_FAQPAGE_SUCCESS",
                payload: res._id,
            });

        }).catch((err) => {
            dispatch({
                type: "CREATE_FAQPAGE_FAIL",
                payload: err,
            });
        })
    } catch (error) {
        dispatch({
            type: "CREATE_FAQPAGE_FAIL",
            payload: error,
        });
    }
};

// faqpage 
export const getFaqPage = () => async (dispatch) => {
    try {
        dispatch({ type: "ALL_FAQPAGE_REQUEST" });
        const { data } = await axios.get('http://localhost:5000/admin/faq/getfaqpage');
        dispatch({
            type: "ALL_FAQPAGE_SUCCESS",
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: "ALL_FAQPAGE_FAIL",
            payload: error.response.data.message,
        });
    }
};
export const publishFaqPage = (id) => async (dispatch) => {
    try {
        dispatch({ type: "ALL_PUBLISHFAQPAGE_REQUEST" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        };

        const { data } = await axios.put(`http://localhost:5000/admin/faq/publishfaqpage/${id}`, {}, config);
        dispatch({
            type: "ALL_PUBLISHFAQPAGE_SUCCESS",
            payload: data,
        });
        dispatch(getFaqPage())
    } catch (error) {
        dispatch({
            type: "ALL_PUBLISHFAQPAGE_FAIL",
            payload: error.response.data.message,
        });
    }
};
export const getPublishFaqPage = () => async (dispatch) => {
    try {
        dispatch({ type: "ALL_GETPUBLISHFAQPAGE_REQUEST" });

        const { data } = await axios.get('http://localhost:5000/admin/faq/getpublishedfaqpage');

        dispatch({
            type: "ALL_GETPUBLISHFAQPAGE_SUCCESS",
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: "ALL_GETPUBLISHFAQPAGE_FAIL",
            payload: error.response.data.message,
        });
    }
};
export const deletefaqPage = (id) => async (dispatch) => {
    try {
        dispatch({ type: "DELETE_FAQPAGE_REQUEST" });
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        };
        const { data } = await axios.delete(`http://localhost:5000/admin/faq/deletefaqpage/${id}`, config);
        await dispatch({
            type: "DELETE_FAQPAGE_SUCCESS",
            payload: data.data,
        });
        dispatch(getFaqPage());
    } catch (error) {
        dispatch({
            type: "DELETE_FAQPAGE_FAIL",
            payload: error.response.data.message,
        });
    }
};

export const updateFaqAction = ({ faqData, id }) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_FAQPAGE_REQUEST" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        };
        const { data } = await axios.put(`http://localhost:5000/admin/faq/updatefaqpage/${id}`,
            faqData,
            config
        );
        dispatch({
            type: "UPDATE_FAQPAGE_SUCCESS",
            payload: data._id,
        });
        dispatch(getPublishFaqPage())
    } catch (error) {
        dispatch({
            type: "UPDATE_FAQPAGE_FAIL",
            payload: error,
        });
    }
};