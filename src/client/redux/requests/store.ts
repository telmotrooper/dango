import { RequestStore } from "../../utils/interfaces"

const initializeRequestStore = (): RequestStore => ({
  data: {},
  loading: false,
  error: null
})

export const initialState: RequestsState = {
  submitCode: initializeRequestStore()
}

export interface RequestsState {
  submitCode: RequestStore;
}
