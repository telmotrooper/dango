import { createSlice } from "@reduxjs/toolkit"

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        showClearModal: false
    },
    reducers: {
        toggleClearModal: (state) => {
            state.showClearModal = !state.showClearModal
        }
    }
})

export const { toggleClearModal } = modalSlice.actions

export default modalSlice.reducer
