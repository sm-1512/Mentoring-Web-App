import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const Session = () => {
  const { mentorId } = useParams(); // Used to access the mentor ID from the URL. UseParams is used to extract dynamic parameters from the URL. Provided by react-router-dom.
  // We can use this ID to fetch session details or mentor information as needed.
  //The mentor id variable we are using here is the same as the one we are using in the App.jsx file in the route path "/session/:mentorId" element={<Session />}.
  const { mentors, currencySymbol, backendUrl, token, getMentorsData } = useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const navigate = useNavigate();

  const [mentorInfo, setMentorInfo] = useState(null);
  const [mentorSlot, setMentorSlot] = useState([]); // This state is used to store the mentor slot information, which can be used to display available slots for the mentor's session.
  const [slotIndex, setSlotIndex] = useState(0); // This state is used to track the index of the selected slot in the mentorSlot array. It can be used to highlight or display the selected slot.
  const [slotTime, setSlotTime] = useState(""); // This state is used to store the time of the selected slot. It can be used to display the time of the session or for booking purposes.

  const fetchMentorInfo = async () => {
    const mentorInfo = mentors.find((mentor) => mentor._id === mentorId); // This function finds the mentor in the mentors array using the mentorId from the URL. mentorId we are fetching from the URL using useParams.
    setMentorInfo(mentorInfo); // It sets the mentorInfo state with the found mentor's information.
    console.log(mentorInfo); // This logs the mentor's information to the console for debugging purposes.
  };

  const getAvailableSlots = async () => {
    setMentorSlot([]); // Clear previous slots

    let today = new Date();
    let isAfter7PM = today.getHours() >= 19;

    for (let i = 0; i < 15; i++) {
      if (isAfter7PM && i === 0) continue;

      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      currentDate.setHours(19, 0, 0, 0); // 7 PM

      let dayOfWeek = currentDate.getDay();
      if (![5, 6, 0].includes(dayOfWeek)) continue; // Only FRI (5), SAT (6), SUN (0)

      let endTime = new Date(currentDate);
      endTime.setHours(22, 0, 0, 0); // 10 PM : Modify if you want session from 7 -> 9. Make it to 21, then slots can only be booked till 8PM

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;;
        const slotTime = formattedTime;

        const isSlotAvailable =
          mentorInfo.slots_booked[slotDate] &&
          mentorInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          // Add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        // Increment current time by 60 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 60);
      }

      setMentorSlot((prev) => [...prev, timeSlots]);
    }
  };

  const bookSession = async () => {
    try {
      if (!token) {
        toast.warning("Login to book session");
        return navigate("/login");
      }
      //const date = new Date(mentorSlot[slotIndex][0].date);
      // Extracting the date and time from the selected slot

      const date = mentorSlot[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(backendUrl + "/api/user/book-session",{ mentorId, slotDate, slotTime },{ headers: { token }});
      if (data.success) {
        toast.success(data.message);
        getMentorsData();
        navigate("/my-sessions");
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    

  };

  useEffect(() => {
    if(mentors.length>0){
      fetchMentorInfo();
    }
  }, [mentors, mentorId]); // This effect runs when the mentors array or mentorId changes. It calls fetchMentor to update the mentorInfo state with the correct mentor's information.

useEffect(() => {
  if (mentorInfo) {
    getAvailableSlots();
  }
}, [mentorInfo]); // This effect runs when the mentorInfo state changes. It calls getAvailable
  // slots to update the docSlot state with available slots for the selected mentor.

  useEffect(() => {
    if (mentorSlot.length > 0 && mentorSlot[0].length > 0) {
      setSlotTime(mentorSlot[0][0].time);
    }
  }, [mentorSlot]);
  // This effect runs when the docSlot state changes. It sets the initial
  // slot time to the first available slot's time.

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // This effect runs once when the component mounts. It scrolls the window to the top.

  return (
    mentorInfo && (
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-10">
        {/* Mentor Info Card */}
        <div className="flex flex-col sm:flex-row gap-6 bg-white border border-gray-200 rounded-2xl shadow-md p-6">
          {/* Image */}
          <div className="w-full sm:max-w-64">
            <img
              className="rounded-xl object-cover w-full h-auto"
              src={mentorInfo.image}
              alt={mentorInfo.name}
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
              {mentorInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="verified" />
            </div>

            <div className="flex items-center gap-2 text-sm mt-2 text-gray-600">
              <p>
                {mentorInfo.degree} - {mentorInfo.branch}
              </p>
              <span className="py-0.5 px-2 bg-blue-100 text-blue-600 rounded-full text-xs">
                {new Date().getFullYear() - mentorInfo.graduationYear} Years Exp
              </span>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium text-gray-800 flex items-center gap-1">
                About
                <img className="w-3" src={assets.info_icon} alt="info" />
              </p>
              <p className="text-sm text-gray-600 mt-1">{mentorInfo.about}</p>
            </div>

            <div className="mt-4">
              <p className="font-medium text-gray-700">
                Personal Session Fee:{" "}
                <span className="text-gray-900 font-semibold">
                  {currencySymbol}
                  {mentorInfo.fees}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Slot Selection */}
        <div className="mt-10 font-medium text-gray-800">
          <p className="text-lg mb-3">Available Booking Slots</p>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {mentorSlot.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`min-w-20 px-4 py-3 rounded-xl cursor-pointer text-center shadow-sm transition duration-200 ${
                  slotIndex === index
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-200 text-gray-700"
                }`}
              >
                <p className="text-sm font-semibold">
                  {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                </p>
                <p className="text-base">
                  {item[0] && item[0].datetime.getDate()}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6 overflow-x-auto">
            {mentorSlot[slotIndex]?.map((item, index) => (
              <span
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`px-5 py-2 rounded-full text-sm cursor-pointer whitespace-nowrap transition duration-150 ${
                  item.time === slotTime
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.time.toLowerCase()}
              </span>
            ))}
          </div>

          <button
            onClick={bookSession}
            className="mt-8 bg-blue-600 hover:bg-blue-700 transition text-white px-10 py-3 rounded-full text-sm font-medium shadow-md"
          >
            Book Appointment
          </button>
        </div>
      </div>
    )
  );
};

export default Session;
