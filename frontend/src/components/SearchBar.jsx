import { useState } from "react";
import axios from "axios";

export default function SearchBar({ setResults }) {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await axios.get(
        `http://localhost:4000/api/user/search-mentors`,
        { params: { q: query } }
      );
      setResults(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]); // show "no results" instead of crashing
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search by branch, name, college, company, or year…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 rounded-full border border-black focus:outline-none focus:border-gray-500 transition-all duration-300 w-64"
      />
      <button
        type="submit"
        className="bg-transparent text-black px-5 py-2 rounded-full border border-black hover:bg-black hover:text-white transition duration-300"
      >
        Search
      </button>
    </form>
  );
}
