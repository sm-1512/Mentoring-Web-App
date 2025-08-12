import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Mentors = () => {
  const navigate = useNavigate();
  const { mentors } = useContext(AppContext);

  useEffect(() => {
    console.log(mentors);
  }, [mentors]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {mentors.map((item, index) => (
        <div
          onClick={() => {
            navigate(`/session/${item._id}`);
            window.scrollTo(0, 0);
          }}
          className="text-3xl font-bold bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent"
          key={index}
        >
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-60 object-contain rounded-md mb-4 bg-gray-100"
            />
          </div>
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <p className="text-sm font-medium text-gray-600">{item.degree}</p>
          <p className="text-sm font-medium text-gray-600">{item.college}</p>
          <p className="text-sm font-medium text-gray-600">{item.branch}</p>
          <p className="text-sm font-medium text-gray-600">{item.currentCompany}</p>
        </div>
      ))}
    </div>
  );
};

export default Mentors;
