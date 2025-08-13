import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const Mentors = () => {
  const navigate = useNavigate();
  const { mentors } = useContext(AppContext);

  // results = null means "no search yet", [] means "searched but no results"
  const [results, setResults] = useState(null);

  useEffect(() => {
    console.log("mentors from context:", mentors);
  }, [mentors]);

  // choose what to display: search results if present, else full list
  const listToShow = results !== null ? results : mentors;

  return (
    <div className="p-4">
      {/* Search bar */}
      <div className="mb-6">
        <SearchBar setResults={setResults} />
      </div>

      {/* Empty state (only when a search has been performed) */}
      {results !== null && listToShow.length === 0 && (
        <p className="text-gray-500">No mentors found.</p>
      )}

      {/* Mentor list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listToShow.map((item) => (
          <div
            onClick={() => {
              navigate(`/session/${item._id}`);
              window.scrollTo(0, 0);
            }}
            key={item._id}
            className="cursor-pointer"
          >
            <div className="bg-white rounded-lg shadow-md p-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-60 object-contain rounded-md mb-4 bg-gray-100"
              />
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-sm font-medium text-gray-600">{item.degree}</p>
              <p className="text-sm font-medium text-gray-600">
                {item.college}
              </p>
              <p className="text-sm font-medium text-gray-600">{item.branch}</p>
              <p className="text-sm font-medium text-gray-600">
                {item.currentCompany}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentors;
