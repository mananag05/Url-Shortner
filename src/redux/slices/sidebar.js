"use client"

import { createSlice } from "@reduxjs/toolkit";


const Sidenav = createSlice({
     name : "Sidenav",
     initialState : false,
     reducers : {
        toggle : (curval) => {
            return !curval
        }
     }
})

export const {toggle} = Sidenav.actions;
export default Sidenav.reducer;
