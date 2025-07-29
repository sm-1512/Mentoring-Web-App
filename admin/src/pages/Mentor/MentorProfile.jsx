import React, { useContext, useEffect, useState } from 'react'
import { MentorContext } from '../../context/MentorContext'
import { AppContext } from '../../context/AppContext';
import { toast } from "react-toastify";
import axios from "axios";

const MentorProfile = () => {
  const {mToken, profileData, setProfileData, getProfileData} = useContext(MentorContext);
  const {currency, backendUrl} = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);


  const updateProfile = async() => {
      try {
        const updateData = {
            name : profileData.name,
            fees : profileData.fees,
            currentCompany : profileData.currentCompany,
            available: profileData.available,
            about: profileData.about,
        }
        
        const {data} = await axios.post(backendUrl + '/api/mentor/update-profile', updateData, {headers:{mToken}});
        if (data.success) {
          toast.success(data.message);
          setIsEdit(false);
          getProfileData();
        } else {
          toast.error(data.message);
        }

      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
  }


  useEffect(()=>{
    if(mToken){
      getProfileData();
    }
  },[mToken])


  return (
    profileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
              src={profileData.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/* ----- Mentor Info : name, degree, experience, current company ----- */}
            {isEdit ? (
              <input
                type="text"
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            ) : (
              <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
                {profileData.name}
              </p>
            )}

            {isEdit ? (
              <input
                type="text"
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    currentCompany: e.target.value,
                  }))
                }
              />
            ) : (
              <p className="flex items-center gap-2 text-xl font-medium text-gray-700">
                {profileData.currentCompany}
              </p>
            )}

            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree} - {profileData.branch}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {new Date().getFullYear() - profileData.graduationYear} Years
                Exp
              </button>
            </div>

            {/* ----- Mentor About ----- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
                About :
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {isEdit ? (
                  <textarea
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        about: e.target.value,
                      }))
                    }
                    type="text"
                    className="w-full outline-primary p-2"
                    rows={8}
                    value={profileData.about}
                  />
                ) : (
                  profileData.about
                )}
              </p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Session fee:{" "}
              <span className="text-gray-800">
                {currency}{" "}
                {isEdit ? (
                  <input
                    type="number"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={profileData.fees}
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>

            <div className="flex gap-1 pt-2">
              <input
                type="checkbox"
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={profileData.available}
              />
              <label htmlFor="">Available</label>
            </div>

            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit((prev) => !prev)}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default MentorProfile