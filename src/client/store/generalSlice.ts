import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Engine } from "d3-graphviz"

export const generalSlice = createSlice({
    name: "general",
    initialState: {
        sendButtonEnabled: false,
        errorBoundaryKey: 0,
        engine: "dot" as Engine 
    },
    reducers: {
        incrementErrorBoundaryKey: (state) => {
            state.errorBoundaryKey += 1
        },
        setEngine: (state, action: PayloadAction<Engine>) => {
            state.engine = action.payload
        },
        enableSendButton: (state, action: PayloadAction<boolean>) => {
            state.sendButtonEnabled = action.payload
        }
    }
})

export const { enableSendButton, incrementErrorBoundaryKey, setEngine } = generalSlice.actions

export default generalSlice.reducer
