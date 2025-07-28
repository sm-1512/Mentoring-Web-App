import React, { useContext, useEffect } from "react";
import { MentorContext } from "../../context/MentorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets.js";

const MentorAppointment = () => {
  const { mToken, sessions, getSessions, completeSession, cancelSession } = useContext(MentorContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (mToken) {
      getSessions();
    }
  }, [mToken]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Your Sessions</h2>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-7 gap-4 bg-gray-100 py-3 px-6 text-sm font-medium text-gray-600 border-b">
          <span>#</span>
          <span>Student</span>
          <span>Payment</span>
          <span>Date & Time</span>
          <span>Fees</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {/* Rows */}
        {sessions.reverse().map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:grid grid-cols-7 gap-4 items-center py-4 px-6 border-b hover:bg-gray-50 transition-all duration-150"
          >
            {/* Index */}
            <span className="text-gray-500 font-medium">{index + 1}</span>

            {/* Student Info */}
            <div className="flex items-center gap-3 w-full">
              <img
                src={item.userData.image}
                className="w-10 h-10 rounded-full object-cover"
                alt="Student"
              />
              <div>
                <p className="font-medium">{item.userData.name}</p>
                <p className="text-xs text-gray-400">
                  {item.userData.currentYear} | {item.userData.branch}
                </p>
              </div>
            </div>

            {/* Payment Type */}
            <span className="text-xs font-medium bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
              {item.payment ? "Online" : "Cash"}
            </span>

            {/* Date & Time */}
            <span className="text-sm text-gray-700">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </span>

            {/* Fees */}
            <span className="font-semibold text-gray-800">
              {currency}
              {item.amount}
            </span>

            {/* Status */}
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                item.cancelled
                  ? "bg-red-100 text-red-500"
                  : item.isCompleted
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {item.cancelled
                ? "Cancelled"
                : item.isCompleted
                ? "Completed"
                : "Pending"}
            </span>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {!item.cancelled && !item.isCompleted && (
                <>
                  <img
                    onClick={() => cancelSession(item._id)}
                    src={assets.cancel_icon}
                    alt="Cancel"
                    className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                  />
                  <img
                    onClick={() => completeSession(item._id)}
                    src={assets.tick_icon}
                    alt="Complete"
                    className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorAppointment;
