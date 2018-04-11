import { createStore, applyMiddleware } from "redux";

import reducers from "./reducers";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

const middleware = applyMiddleware(promise(), thunk);

const store = createStore(reducers, middleware);

export default store;