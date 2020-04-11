import { Cookies } from "react-cookie";

const cookies = new Cookies();

const initState = {
  auth: null,
  token: cookies.get("auth_token") || null,
};

const rootReducer = (state = initState, action) => {
  if (action.type === "SET_AUTH") {
    console.log(action);
    console.log(Cookies);
    
      cookies.set("auth_token", action.payload.token, { path: "/" });
      return {
        auth: action.payload,
        token: action.payload.token,
      };
    }
  return state;
};

export default rootReducer;
