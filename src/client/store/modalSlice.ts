import { createSlice } from "@reduxjs/toolkit"

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        showClearModal: false,
        showHelpModal: false
    },
    reducers: {
        toggleClearModal: (state) => {
            state.showClearModal = !state.showClearModal
        },
        toggleHelpModal: (state) => {
            state.showHelpModal = !state.showHelpModal
        }
    }
})

export const { toggleClearModal, toggleHelpModal } = modalSlice.actions

export default modalSlice.reducer
