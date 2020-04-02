const initState = {
    auth: null
};

const rootReducer = (state = initState, action) => {
    console.log({ action: action });
    if (action.type === "SET_AUTH") {
        console.log(action);
        return {
            auth: action.payload
        };
    }
    return state;
};

export default rootReducer;