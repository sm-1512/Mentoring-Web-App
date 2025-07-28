import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const MentorContext = createContext();

const MentorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [mToken, setMToken] = useState(localStorage.getItem("mToken") ? localStorage.getItem("mToken") : "");
    const [sessions, setSessions] = useState([]);
    

    const getSessions = async() => {
      try {
        const {data} = await axios.get(backendUrl + '/api/mentor/sessions', {headers:{mToken}});
        if(data.success){
          setSessions(data.sessions);
          
          
        } else {
          toast.error(data.message);
        }

      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
    

    //Frontend(ie. MentorAppointments) will call this and get session from there and this gives a call to backend route which then gives call to controller which will execute everything.
    const cancelSession = async(sessionId) => {
      try {
        const { data } = await axios.post(
          backendUrl + "/api/mentor/cancel-session",
          { sessionId },
          { headers: { mToken } }
        );
        if(data.success){
          toast.success(data.message);
          getSessions();
          
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }

    const completeSession = async(sessionId) => {
      try {
        const { data } = await axios.post(
          backendUrl + "/api/mentor/complete-session",
          { sessionId },
          { headers: { mToken } }
        );
        if(data.success){
          toast.success(data.message);
          getSessions();
        
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
      
    }


    const value = {
      mToken,
      setMToken,
      backendUrl,
      sessions,
      setSessions,
      getSessions,
      cancelSession,
      completeSession,
    };

    return (
        <MentorContext.Provider value={value}>
            {props.children}
        </MentorContext.Provider>
    )
}

export default MentorContextProvider;

//This is the workflow of one of the function for understanding how this works.
/* Mentor clicks cancel icon (frontend)
    ↓
cancelAppointment() sends POST request with sessionId + mToken
    ↓
Backend route verifies mToken via authMentor middleware → adds req.mentor
    ↓
Controller checks if session belongs to mentor
    ↓
If match, updates DB with cancelled: true
    ↓
Frontend re-fetches updated sessions
 */