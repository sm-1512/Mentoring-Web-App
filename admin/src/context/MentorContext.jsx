import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "./AppContext";

export const MentorContext = createContext();

const MentorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [mToken, setMToken] = useState(
      localStorage.getItem("mToken") ? localStorage.getItem("mToken") : ""
    );

    const value = {
      mToken,
      setMToken,
      backendUrl,
    };

    return (
        <MentorContext.Provider value={value}>
            {props.children}
        </MentorContext.Provider>
    )
}

export default MentorContextProvider