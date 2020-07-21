const initState = {
  agents: [],
  auth: null,
};

const rootReducer = (state = initState, action) => {
  if (action.type === "SET_SEARCH_AGENTS") {
    return {
      agents: action.agents,
    };
  }

  return state;
};

export default rootReducer;
