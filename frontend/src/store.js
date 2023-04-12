// import { applyMiddleware, compose } from "redux";
// // import { createStore } from "redux";
// import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers";

// const initialState = {};

// const middleWare = [thunk];

// const store = configureStore(
//   rootReducer,
//   initialState,
//   compose(
//     applyMiddleware(...middleWare),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

// export default store;

// import { applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
