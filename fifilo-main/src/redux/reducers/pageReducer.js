let data = JSON.parse(localStorage.getItem("currentpagedata"))
export const pageReducer = (state = { pageData: data, pageloading: true }, action) => {
    switch (action.type) {
        case "PAGEDATA":
            return {
                pageloading: false,
                pageData: action.payload
            };

        default:
            return state;
    }
};
