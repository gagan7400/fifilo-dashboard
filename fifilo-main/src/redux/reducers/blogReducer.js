export const blogReducer = (state = {
    blogloading: true,
    error: null,
    blogdata: null,
    publishedblogdata: null,
    updateblogloading: true,
    deleteloading: true
}, action) => {
    switch (action.type) {
        case "ALL_BLOG_REQUEST":
        case "ALL_PUBLISHblogPAGE_REQUEST":
        case "ALL_GETPUBLISHblogPAGE_REQUEST":
        case "CREATE_BLOG_REQUEST":
        case "DELETE_BLOG_REQUEST":
        case "UPDATE_BLOG_REQUEST":
            return { ...state, blogloading: true, error: null };

        case "ALL_BLOG_SUCCESS":
            return { ...state, blogloading: false, blogdata: action.payload.data };
        case "CREATE_BLOG_SUCCESS":
            return { ...state, blogloading: false, };

        case "ALL_PUBLISHblogPAGE_SUCCESS":
            return { ...state, blogloading: false };
        case "ALL_GETPUBLISHblogPAGE_SUCCESS":
            return { ...state, blogloading: false, publishedblogdata: action.payload };

        case "DELETE_BLOG_SUCCESS":
            return { ...state, blogloading: false, deleteloading: false };

        case "UPDATE_BLOG_SUCCESS":
            return { ...state, blogloading: false, updateblogloading: false };

        case "ALL_BLOG_FAIL":
        case "CREATE_BLOG_FAIL":
        case "ALL_PUBLISHblogPAGE_FAIL":
        case "ALL_GETPUBLISHblogPAGE_FAIL":
        case "DELETE_BLOG_FAIL":
        case "UPDATE_BLOG_FAIL":
            return { ...state, blogloading: false, error: action.payload };

        default:
            return state;
    }
};
