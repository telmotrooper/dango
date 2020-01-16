import { combineReducers } from "redux";
import { requestsReducer } from "./requests/reducer";

const rootReducer = combineReducers({
  requests: requestsReducer
})

export { rootReducer }
