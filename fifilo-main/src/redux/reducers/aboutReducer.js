
// export const aboutPageReducer = (state = { updateaboutloading: true, updateabouterror: null, aboutdata: [], publishedaboutdata: {}, publishedaboutloading: true, deleteloading: true, deleteerror: null }, action) => {
//     switch (action.type) {
//         case "ALL_ABOUTPAGE_REQUEST":
//             return {
//                 ...state
//                 , loading: true,
//                 aboutdata: [],
//             };
//         case "ALL_ABOUTPAGE_SUCCESS":
//             return {
//                 ...state,
//                 loading: false,
//                 aboutdata: action.payload,
//             };

//         case "ALL_ABOUTPAGE_FAIL":
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//             };
//         case "DELETE_ABOUTPAGE_REQUEST":
//             return {
//                 ...state,
//                 deleteloading: true,

//             };
//         case "DELETE_ABOUTPAGE_SUCCESS":
//             return {
//                 ...state,
//                 deleteloading: false,
//             };
//         case "DELETE_ABOUTPAGE_FAIL":
//             return {
//                 ...state,
//                 deleteloading: false,
//                 deleteerror: action.payload,
//             };
//         case "UPDATE_ABOUTPAGE_REQUEST":
//             return {
//                 updateaboutloading: false,
//             };
//         case "UPDATE_ABOUTPAGE_SUCCESS":
//             return {
//                 updateaboutloading: false,
//             };
//         case "UPDATE_ABOUTPAGE_FAIL":
//             return {
//                 updateaboutloading: false,
//                 updateabouterror: action.payload,
//             };
//         case "ALL_PUBLISHABOUTPAGE_REQUEST":
//             return {
//                 ...state,
//                 loading: true,

//             };
//         case "ALL_PUBLISHABOUTPAGE_SUCCESS":
//             return {
//                 ...state,
//                 publishedaboutloading: false,

//             };

//         case "ALL_PUBLISHABOUTPAGE_FAIL":
//             return {
//                 ...state,
//                 publishedaboutloading: false,
//                 error: action.payload,
//             };
//         case "ALL_GETPUBLISHABOUTPAGE_REQUEST":
//             return {
//                 ...state,
//                 publishedaboutloading: true,
//                 publishedaboutdata: {}
//             };
//         case "ALL_GETPUBLISHABOUTPAGE_SUCCESS":
//             return {
//                 ...state,
//                 publishedaboutloading: false,
//                 publishedaboutdata: action.payload
//             };

//         case "ALL_GETPUBLISHABOUTPAGE_FAIL":
//             return {
//                 ...state,
//                 publishedaboutloading: false,
//                 error: action.payload,
//             };

//         default:
//             return state;
//     }
// }


// Optimized Reducer
export const aboutPageReducer = (
    state = {
        loading: true,
        updateLoading: true,
        deleteLoading: true,
        publishedLoading: true,
        aboutData: null,
        publishedData: null,
        error: null,
        deleteError: null,
        updateError: null,
    },
    action
) => {
    switch (action.type) {
        case "ALL_ABOUTPAGE_REQUEST":
        case "ALL_PUBLISHABOUTPAGE_REQUEST":
        case "ALL_GETPUBLISHABOUTPAGE_REQUEST":
            return { ...state, loading: true, error: null };

        case "ALL_ABOUTPAGE_SUCCESS":
            return { ...state, loading: false, aboutData: action.payload };

        case "ALL_ABOUTPAGE_FAIL":
            return { ...state, loading: false, error: action.payload };

        case "DELETE_ABOUTPAGE_REQUEST":
            return { ...state, deleteLoading: true, deleteError: null };

        case "DELETE_ABOUTPAGE_SUCCESS":
            return { ...state, deleteLoading: false, aboutData: state.aboutData?.filter(about => about._id !== action.payload) };

        case "DELETE_ABOUTPAGE_FAIL":
            return { ...state, deleteLoading: false, deleteError: action.payload };

        case "UPDATE_ABOUTPAGE_REQUEST":
            return { ...state, updateLoading: true, updateError: null };

        case "UPDATE_ABOUTPAGE_SUCCESS":
            return { ...state, updateLoading: false };

        case "UPDATE_ABOUTPAGE_FAIL":
            return { ...state, updateLoading: false, updateError: action.payload };

        case "ALL_PUBLISHABOUTPAGE_SUCCESS":
            return { ...state, loading: false, publishedLoading: false };

        case "ALL_PUBLISHABOUTPAGE_FAIL":
            return { ...state, publishedLoading: false, error: action.payload };

        case "ALL_GETPUBLISHABOUTPAGE_SUCCESS":
            return { ...state, publishedLoading: false, publishedData: action.payload };

        case "ALL_GETPUBLISHABOUTPAGE_FAIL":
            return { ...state, publishedLoading: false, error: action.payload };

        default:
            return state;
    }
};