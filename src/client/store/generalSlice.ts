import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Engine } from "d3-graphviz"

export const generalSlice = createSlice({
    name: "general",
    initialState: {
        errorBoundaryKey: 0,
        engine: "dot" as Engine 
    },
    reducers: {
        incrementErrorBoundaryKey: (state) => {
            state.errorBoundaryKey += 1
        },
        setEngine: (state, action: PayloadAction<Engine>) => {
            state.engine = action.payload
        }
    }
})

export const { incrementErrorBoundaryKey, setEngine } = generalSlice.actions

export default generalSlice.reducer
