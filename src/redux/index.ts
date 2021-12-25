import { applyMiddleware, createStore } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import reducers, { IState } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "connected-react-router";
import history from "./history";

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(
    routerMiddleware(history),
    thunk as ThunkMiddleware<IState>
  )
));

export default store;