import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Engine } from "d3-graphviz"

export const setDiagram = createAsyncThunk("general/setDiagram", async (diagram: string, thunkAPI) => {
    thunkAPI.dispatch(_setDiagram(diagram))
    thunkAPI.dispatch(incrementErrorBoundaryKey()) // This allows us to reattempt to render after a Graphviz error.
})

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
        _setDiagram: (state, action: PayloadAction<string>) => {
            state.diagram = action.payload
        },
        setEngine: (state, action: PayloadAction<Engine>) => {
            state.engine = action.payload
        }
    }
})

const { _setDiagram } = generalSlice.actions

export const { enableSendButton, incrementErrorBoundaryKey, setEngine } = generalSlice.actions

export default generalSlice.reducer
