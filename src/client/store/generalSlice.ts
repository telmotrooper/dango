import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Engine } from "d3-graphviz"

export const generalSlice = createSlice({
    name: "general",
    initialState: {
        diagram: "graph G {}",
        engine: "dot" as Engine,
        errorBoundaryKey: 0,
        sendButtonEnabled: false
    },
    reducers: {
        enableSendButton: (state, action: PayloadAction<boolean>) => {
            state.sendButtonEnabled = action.payload
        },
        incrementErrorBoundaryKey: (state) => {
            state.errorBoundaryKey += 1
        },
        setDiagram: (state, action: PayloadAction<string>) => {
            state.diagram = action.payload
            state.errorBoundaryKey += 1 // This allows us to reattempt to render after a Graphviz error.
            // TODO: Try to dispatch a call to "incrementErrorBoundaryKey" using Thunk.
        },
        setEngine: (state, action: PayloadAction<Engine>) => {
            state.engine = action.payload
        }
    }
})

export const { enableSendButton, incrementErrorBoundaryKey, setDiagram, setEngine } = generalSlice.actions

export default generalSlice.reducer
