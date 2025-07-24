import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "./AppContext";

export const MentorContext = createContext();

const MentorContextProvider = (props) => {

    const value = {

    }

    return (
        <MentorContext.Provider value={value}>
            {props.children}
        </MentorContext.Provider>
    )
}

export default MentorContextProvider