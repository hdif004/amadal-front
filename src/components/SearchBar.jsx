import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../api/api";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const fetchSuggestions = async (value) => {
    if (value) {
      try {
        const data = await searchProducts(value);
        console.log("Suggestions fetched:", data);
        setSuggestions(data);
        setIsDropdownOpen(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    console.log("Suggestion clicked:", suggestion);
    setQuery(suggestion.name);
    setIsDropdownOpen(false);
    
    const productUrl = `/products/${suggestion.name}/${suggestion.id}`;
    console.log("Navigating to:", productUrl);
    navigate(productUrl);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        inputRef.current && !inputRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", query);
    onSearch(query);
    const searchUrl = `/search?q=${encodeURIComponent(query)}`;
    console.log("Navigating to:", searchUrl);
    navigate(searchUrl);
  };

  return (
    <div className="relative lg:w-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative border border-black rounded-md h-[50px] flex items-center justify-between px-4">
          <input
            ref={inputRef}
            type="text"
            className="text-black font-light w-full"
            placeholder="Search Here..."
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsDropdownOpen(true)}
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </form>

      {isDropdownOpen && suggestions.length > 0 && (
        <ul ref={dropdownRef} className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md z-10 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="cursor-pointer p-2 hover:bg-gray-200 flex items-center"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <img src={suggestion.imageURL} alt={suggestion.name} className="w-10 h-10 mr-2" />
              <span className="text-black">{suggestion.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;