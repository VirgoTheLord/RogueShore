import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const sortBy = searchParams.get("sortBy") || "";
  const options = [
    { value: "", label: "Default" },
    { value: "priceAsc", label: "Price: Low to High" },
    { value: "priceDesc", label: "Price: High to Low" },
    { value: "popularity", label: "Popularity" },
  ];

  const handleSortChange = (value) => {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="mb-4 flex items-center justify-end relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border border-main bg-secondary p-2 rounded-md focus:outline-none md:text-sm text-xs flex items-center"
      >
        {options.find((opt) => opt.value === sortBy)?.label || "Default"}
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-10 right-0 bg-white border border-main rounded-md shadow-lg z-10 w-48 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className="block w-full text-left px-4 py-2 text-xs md:text-sm hover:bg-secondary focus:outline-none"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortOptions;
