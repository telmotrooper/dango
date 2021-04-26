import { configureStore } from "@reduxjs/toolkit"
import { generalSlice } from "./generalSlice"
import { modalSlice } from "./modalSlice"

export const store = configureStore({
    reducer: {
        general: generalSlice.reducer,
        modal: modalSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
