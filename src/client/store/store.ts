import { configureStore } from "@reduxjs/toolkit"
import { mainSlice } from "./mainSlice"

export default configureStore({
    reducer: {
        main: mainSlice.reducer
    }
})
