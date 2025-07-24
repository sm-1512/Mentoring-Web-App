import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    

    const currencySymbol = "₹";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [mentors, setMentors] = useState([]);

    const value = {
        mentors, 
        currencySymbol
    }

    const getMentorsData = async() => {
        try {
            const {data} = await axios.get(backendUrl + '/api/mentor/list');
            if(data.success){
                setMentors(data.mentors);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getMentorsData();
    }, [])

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;