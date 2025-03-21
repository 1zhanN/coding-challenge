import React from "react";

function DifficultyStars({ difficulty }) {
  const totalStars = 5;

  // Convert difficulty string to numeric value
  const difficultyMap = {
    easy: 1,
    medium: 2,
    hard: 3,
  };

  const filledStars = difficultyMap[difficulty.toLowerCase()] || 0; // Default to 0 if invalid value

  return (
    <div className="difficulty-stars">
      {[...Array(totalStars)].map((_, index) => (
        <span key={index} className={index < filledStars ? "star filled" : "star"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default DifficultyStars;
