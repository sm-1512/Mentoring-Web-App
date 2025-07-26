import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const MySessions = () => {
  const { getMentorsData, backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1])-1] + " " + dateArray[2];
  }
  const getUserSessions = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/user/sessions', {headers:{token}});
      console.log(data);
      
      setSessions(data.sessions.reverse());
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelSession = async(sessionId) => {
    try {
      const {data} = await axios.post(backendUrl + '/api/user/cancel-session', {sessionId}, {headers:{token}});

      if(data.success){
        toast.success(data.message);
        getUserSessions();
        getMentorsData();
      }
    } catch (error) {
       console.log(error);
       toast.error(error.message);
    }
  }

  useEffect(() => {
    if (token) {
      getUserSessions();
    }
  }, [token]);
  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My sessions
      </p>
      <div>
        {sessions.slice(0, sessions.length).map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.mentorData.image}
                alt=""
              />
            </div>

            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.mentorData.name}
              </p>
              <p className="text-xs">
                {item.degree} -{item.mentorData.branch}
              </p>
              <p className="text-xs">
                {new Date().getFullYear() - item.mentorData.graduationYear}{" "}
                Years Experience
              </p>

              <p className=" mt-1">
                <span className="text-sm">Date & Time:</span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && (
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                  Pay Online
                </button>
              )}
              {item.cancelled ? (
                <p className="sm:min-w-48 py-2 border text-center border-red-500 rounded text-red-500">
                  Cancelled
                </p>
              ) : (
                <button
                  onClick={() => cancelSession(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel appointment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySessions;
