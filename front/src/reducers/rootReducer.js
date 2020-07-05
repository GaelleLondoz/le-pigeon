const initState = {
    agents: [],
    auth: null
};

const rootReducer = (state = initState, action) => {
    // if(action.type === 'SET_AUTH') {
    //     console.log(action);
    //     return {
    //         auth: {
    //             name: "Test",
    //             text: "dsdbs"
    //         }
    //     }
    // }  
    console.log({ action });

    if (action.type === 'SET_SEARCH_AGENTS') {
        console.log({ action });
        // return {
        //     agents: {
        //         name: "Test",
        //         text: "dsdbs"
        //     }
        // }
        return {
            agents: action.agents
        }
    }

    return state;
};

export default rootReducer;
