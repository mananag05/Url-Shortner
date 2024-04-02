"use client"

import { reduxstore} from "./store"
import { Provider} from "react-redux"


export function ReduxProvider({ children }) {
    return <Provider store={reduxstore}>
            {children}
           </Provider>
}