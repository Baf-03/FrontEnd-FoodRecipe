import React from "react";
import { Link } from "react-router-dom";

export function CardComp({ detail }) {
  const { images, ingredients, recipe_name, _id } = detail;

  // Ensure ingredients are displayed correctly (even if not an array)
  const ingredientsText = Array.isArray(ingredients)
    ? ingredients.join(", ")
    : ingredients || "No ingredients available";

  return (
    <div className="group relative w-[20rem] bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      {/* Card Header with Image */}
      <div className="h-[15rem] overflow-hidden">
        <img
          src={images && images[0] ? images[0] : "https://via.placeholder.com/300"}
          alt={recipe_name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Card Body */}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 group-hover:text-blue-500 transition duration-300">
            {recipe_name}
          </h2>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">
          {ingredientsText}
        </p>
      </div>

      {/* Card Footer with Button */}
      <div className="p-4 pt-0">
        <Link to={`/recipe/${_id}`}>
          <button
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md 
            hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 
            focus:ring-opacity-75 transition duration-300"
          >
            Show Details
          </button>
        </Link>
      </div>
    </div>
  );
}
