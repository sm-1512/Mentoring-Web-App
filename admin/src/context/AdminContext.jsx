import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  const [sessions, setSessions] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [dashData, setDashData] = useState(false);

  // Getting all Mentors data from Database using API
  const getAllMentors = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/all-mentors", {
        headers: { aToken },
      });
      if (data.success) {
        setMentors(data.mentors);
        console.log(data.mentors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to change mentor availablity using API
  const changeAvailablity = async (mentorId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { mentorId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllMentors(); //Mentor data has been changed. Hence I called it again.
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Getting all sessions data from Database using API
  const getAllSessions = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/sessions", {
        headers: { aToken },
      });
      if (data.success) {
        setSessions(data.sessions.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Function to cancel appointment using API
  const cancelSession = async (sessionId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-session",{ sessionId },{ headers: { aToken }});

      if (data.success) {
        toast.success(data.message);
        getAllSessions();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }; 

  // Getting Admin Dashboard data from Database using API
   const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { aToken },
      });

      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }; 

  const value = {
    aToken,
    setAToken,
    backendUrl,
    mentors,
    getAllMentors,
    changeAvailablity,
    sessions,
    setSessions,
    getAllSessions,
    cancelSession,
    getDashData,
    dashData,  
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
