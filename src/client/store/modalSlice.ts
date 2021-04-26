import { createSlice } from "@reduxjs/toolkit"

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        showClearModal: false,
        showCypherModal: false,
        showHelpModal: false,
        showParserModal: false
    },
    reducers: {
        toggleClearModal: (state) => {
            state.showClearModal = !state.showClearModal
        },
        toggleCypherModal: (state) => {
            state.showCypherModal = !state.showCypherModal
        },
        toggleHelpModal: (state) => {
            state.showHelpModal = !state.showHelpModal
        },
        toggleParserModal: (state) => {
            state.showParserModal = !state.showParserModal
        }
    }
})

export const { toggleClearModal, toggleCypherModal, toggleHelpModal, toggleParserModal } = modalSlice.actions

export default modalSlice.reducer
