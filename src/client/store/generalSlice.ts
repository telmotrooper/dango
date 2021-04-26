import { createSlice } from "@reduxjs/toolkit"

export const generalSlice = createSlice({
    name: "general",
    initialState: {
        errorBoundaryKey: 0,
    },
    reducers: {
        incrementErrorBoundaryKey: (state) => {
            state.errorBoundaryKey += 1
        },
    }
})

export const { incrementErrorBoundaryKey } = generalSlice.actions

export default generalSlice.reducer
