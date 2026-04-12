// Dropdown.jsx
import React, { useState } from 'react';

const Dropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (item) => {
    setCheckedItems({
      ...checkedItems,
      [item]: !checkedItems[item],
    });
  };

  return (
    <div className="relative inline-block w-full mb-2 text-left">
      <div>
        <button
          type="button"
          className="flex justify-between w-full px-4 py-2 text-lg font-semibold text-gray-700 bg-[#F1F1F1] rounded-md"
          onClick={toggleDropdown}
        >
          <span>{title}</span>
          <svg
            className={`w-5 h-5 ml-2 transition-transform transform ${
              isOpen ? 'rotate-180' : 'rotate-90'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="mt-2">
          <div className="py-1">
            {items.map((item) => (
              <label
                key={item}
                className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={checkedItems[item] || false}
                  onChange={() => handleCheckboxChange(item)}
                  className="mr-2 text-[#048162] border-gray-300 rounded focus:ring-[#048162] hover:text-[#048162]"
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
