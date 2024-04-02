import { configureStore } from "@reduxjs/toolkit"
import sidebar from "./slices/sidebar"


export const reduxstore = configureStore({
    reducer : {
        SIDENAV : sidebar
    }
})