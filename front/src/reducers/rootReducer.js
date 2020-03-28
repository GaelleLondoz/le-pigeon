const initState = {
    auth: null
};
  
  const rootReducer = (state = initState, action) => {
    if(action.type === 'SET_AUTH') {
        console.log(action);
        return {
            auth: {
                name: "Test",
                text: "dsdbs"
            }
        }
    }  
    return state;
  };
  
  export default rootReducer;