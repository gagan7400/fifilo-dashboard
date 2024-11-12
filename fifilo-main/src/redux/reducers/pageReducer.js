export const pageReducer = (state = { pageData: null, loading: true }, action) => {
    switch (action.type) {
        case "PAGEDATA":
            return {
                loading: false,
                pageData: action.payload,
            };

        default:
            return state;
    }
};
