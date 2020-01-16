import { initialState } from "./store";
import { RequestsState } from "./store"
import { AnyAction } from "redux";
import { REQUESTS } from "./actions";

const requestsReducer = (state: RequestsState = initialState, action: AnyAction): RequestsState => {
  switch (action.type) {
    case REQUESTS.SUBMIT_CODE:
      return {
        ...state,
        submitCode: { data: null, loading: true, error: null }
      }
      case REQUESTS.SUBMIT_CODE_ERROR:
        return {
          ...state,
          submitCode: { data: null, loading: false, error: action.payload }
        }
      case REQUESTS.SUBMIT_CODE_SUCCESS:
        return {
          ...state,
          submitCode: { data: action.payload, loading: false, error: null }
        }
    default:
      return state
  }
}

export { requestsReducer }
