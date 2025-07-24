import React, { useState } from "react";
import { assets } from "../assets/assets";
import { PencilIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Richard James",
    image: assets.profile_pic,
    email: "richardjames@gmail.com",
    phone: "+1 123 456 7890",
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Church Road, London",
    },
    gender: "Male",
    dob: "2000-01-20",
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 py-10 text-gray-700">
      {/* Profile Card */}
      <div className="flex flex-col items-center gap-4 mb-10 text-center">
        <img
          src={userData.image}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full border-4 border-gray-200 shadow-md"
        />
        {isEditing ? (
          <input
            type="text"
            className="text-xl font-semibold text-center border-b-2 border-gray-300 focus:outline-none focus:border-secondary"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <h1 className="text-2xl font-semibold">{userData.name}</h1>
        )}
      </div>

      {/* Contact Info */}
      <div className="mb-8">
        <p className="text-lg font-semibold flex items-center gap-2 text-secondary mb-3">
          CONTACT INFORMATION
        </p>
        <div className="grid grid-cols-[120px_1fr] gap-y-4 text-sm">
          <span className="font-medium">Email:</span>
          <span className="text-blue-500">{userData.email}</span>

          <span className="font-medium">Phone:</span>
          {isEditing ? (
            <input
              className="bg-gray-100 rounded px-2 py-1 w-full"
              type="text"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              value={userData.phone}
            />
          ) : (
            <span className="text-blue-500">{userData.phone}</span>
          )}

          <span className="font-medium">Address:</span>
          {isEditing ? (
            <div className="space-y-2">
              <input
                className="bg-gray-100 rounded px-2 py-1 w-full"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData.address.line1}
              />
              <input
                className="bg-gray-100 rounded px-2 py-1 w-full"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={userData.address.line2}
              />
            </div>
          ) : (
            <span>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </span>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div className="mb-10">
        <p className="text-lg font-semibold flex items-center gap-2 text-secondary mb-3">
          BASIC INFORMATION
        </p>
        <div className="grid grid-cols-[120px_1fr] gap-y-4 text-sm">
          <span className="font-medium">Gender:</span>
          {isEditing ? (
            <select
              className="bg-gray-100 rounded px-2 py-1 max-w-xs"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <span>{userData.gender}</span>
          )}

          <span className="font-medium">Birthday:</span>
          {isEditing ? (
            <input
              className="bg-gray-100 rounded px-2 py-1 max-w-xs"
              type="date"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              value={userData.dob}
            />
          ) : (
            <span>{userData.dob}</span>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center">
        {isEditing ? (
          <button
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-2 border border-secondary text-secondary px-6 py-2 rounded-full hover:bg-secondary hover:text-white transition"
          >
            <CheckCircleIcon className="w-5 h-5" />
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 border border-secondary text-secondary px-6 py-2 rounded-full hover:bg-secondary hover:text-white transition"
          >
            <PencilIcon className="w-5 h-5" />
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
