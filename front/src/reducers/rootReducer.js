import { Cookies } from "react-cookie";

const initState = {
    auth: null
        ///token: Cookies.get("token") || ""
};

const rootReducer = (state = initState, action) => {
    if (action.type === "SET_AUTH") {
        console.log(action);
        return {
            auth: action.payload,
            token: action.payload.token
        };
    }
    return state;
};

export default rootReducer;