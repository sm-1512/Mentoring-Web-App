import React, { useContext, useState } from "react";
import { PencilIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { AppContext } from "../context/AppContext";
import {assets} from '../assets/assets.js';
import axios from "axios";
import { toast } from "react-toastify";


const MyProfile = () => {
  const {userData, setUserData, token, backendUrl, loadUserProfileData} = useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async() => {
    try {
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('gender', userData.gender);
        formData.append('phone', userData.phone);
        formData.append('branch', userData.branch);

        image && formData.append('image', image); //This gets appended to form data only if user wants to edit picture
        const {data} = await axios.post(backendUrl + '/api/user/update-profile', formData, {headers:{token}});
        if(data.success){
          toast.success(data.message);
          await loadUserProfileData();
          setIsEditing(false);
          setImage(false);
        } else {
          toast.error(data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
  }

  return (
    userData && (
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-10 text-gray-700">
        {/*To preview image when editing profile picture */}
        {isEditing ? (
          <div className="flex justify-center">
            <label htmlFor="image">
              <div className="inline-block relative cursor-pointer">
                <img
                  className="w-36 rounded opacity-75"
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt=""
                />
                <img
                  className="w-10 absolute bottom-12 right-12"
                  src={image ? null : assets.upload_icon}
                  alt=""
                />
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          </div>
        ) : (
          <div className="flex justify-center">
            <img className="w-36 rounded" src={userData.image} alt="" />
          </div>
        )}
        {/* Profile Card */}
        <div className="flex flex-col items-center gap-4 mb-10 text-center">
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

            <span className="font-medium">Branch</span>
            {isEditing ? (
              <input
                className="bg-gray-100 rounded px-2 py-1 max-w-xs"
                type="string"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, branch: e.target.value }))
                }
                value={userData.dob}
              />
            ) : (
              <span>{userData.branch}</span>
            )}

            <span className="font-medium">College</span>
            <span>{userData.college}</span>
            <span className="font-medium">graduationYear</span>
            <span>{userData.graduationYear}</span>
            <span className="font-medium">currentYear</span>
            <span>{userData.currentYear}</span>
            <span className="font-medium">degree</span>
            <span>{userData.degree}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          {isEditing ? (
            <button
              onClick={updateUserProfileData}
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
    )
  );
};

export default MyProfile;
