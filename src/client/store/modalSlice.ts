import { createSlice } from "@reduxjs/toolkit"

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        showClearModal: false,
        showHelpModal: false,
        showParserModal: false
    },
    reducers: {
        toggleClearModal: (state) => {
            state.showClearModal = !state.showClearModal
        },
        toggleHelpModal: (state) => {
            state.showHelpModal = !state.showHelpModal
        },
        toggleParserModal: (state) => {
            state.showParserModal = !state.showParserModal
        }
    }
})

export const { toggleClearModal, toggleHelpModal, toggleParserModal } = modalSlice.actions

export default modalSlice.reducer
