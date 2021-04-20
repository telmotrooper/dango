import { createSlice } from "@reduxjs/toolkit"

export const mainSlice = createSlice({
    name: "main",
    initialState: {
        showClearModal: false
    },
    reducers: {
        toggleClearModal: (state) => {
            state.showClearModal = !state.showClearModal
        }
    }
})

export const { toggleClearModal } = mainSlice.actions

export default mainSlice.reducer
