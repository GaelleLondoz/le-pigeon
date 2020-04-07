import React from "react"; //test ici
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import store from './store'
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import "./components/services/API";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const customMiddleWare = (store) => (next) => (action) => {
  console.log({ store, action });
  next(action);
};

//createstore => 2 paramater (store and middleware)
const store = createStore(rootReducer, applyMiddleware(customMiddleWare));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>{" "}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
