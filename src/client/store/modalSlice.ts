import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        showClearModal: false,
        showCypherModal: false,
        showDatabaseConnectionModal: false,
        showHelpModal: false,
        showParserModal: false,

        cypherContent: "",
        parserContent: ""
    },
    reducers: {
        toggleClearModal: (state) => {
            state.showClearModal = !state.showClearModal
        },
        toggleCypherModal: (state) => {
            state.showCypherModal = !state.showCypherModal
        },
        toggleDatabaseConnectionModal: (state) => {
            state.showDatabaseConnectionModal = !state.showDatabaseConnectionModal
        },
        toggleHelpModal: (state) => {
            state.showHelpModal = !state.showHelpModal
        },
        toggleParserModal: (state) => {
            state.showParserModal = !state.showParserModal
        },

        setCypherContent: (state, action: PayloadAction<string>) => {
            state.cypherContent = action.payload
        },
        setParserContent: (state, action: PayloadAction<string>) => {
            const text = JSON.stringify(action.payload, null, 2)
            state.parserContent = text
        }
    }
})

export const {
    toggleClearModal, toggleCypherModal, toggleDatabaseConnectionModal,
    toggleHelpModal, toggleParserModal, setCypherContent, setParserContent } = modalSlice.actions

export default modalSlice.reducer
