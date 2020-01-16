import { AnyAction } from 'redux'

export const REQUESTS = {
  SUBMIT_CODE: "REQUESTS/SUBMIT_CODE",
  SUBMIT_CODE_ERROR: "REQUESTS/SUBMIT_CODE_ERROR",
  SUBMIT_CODE_SUCCESS: "REQUESTS/SUBMIT_CODE_ERROR"
}

export const submitCode = (code: string): AnyAction => ({
  type: REQUESTS.SUBMIT_CODE,
  payload: code
})
