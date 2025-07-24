import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const MentorsList = () => {
  const { mentors, aToken, getAllMentors, changeAvailablity } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllMentors();
    }
  }, [aToken]);

  return (
    <div className="p-6 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">All Mentors</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mentors.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition duration-300"
          >
            {/* Image with fixed aspect ratio */}
            <div className="aspect-[3/5] bg-gray-100 overflow-hidden rounded-t-2xl">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-4 space-y-1">
              <p className="text-lg font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-600">
                {item.degree}, {item.branch}
              </p>
              <p className="text-sm text-gray-500">{item.college}</p>
              <p className="text-sm text-gray-700 font-medium">
                {item.currentCompany}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <input
                  onChange={() => changeAvailablity(item._id)}
                  type="checkbox"
                  checked={item.available}
                  readOnly
                  className="accent-primary w-4 h-4"
                />
                <p className="text-sm text-gray-700">Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorsList;
