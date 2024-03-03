// DifficultySelector.js
import React from "react";

function DifficultySelector({ selectedDifficulty, onSelectDifficulty }) {
  const handleChange = (event) => {
    const selectedDifficulty = event.target.value;
    onSelectDifficulty(selectedDifficulty);
  };

  return (
    <div>
      <label htmlFor="difficulty" className="label">
        Select Difficulty:
      </label>
      <select
        id="difficulty"
        value={selectedDifficulty}
        onChange={handleChange}
        className="padding"
      >
        <option value="">--Select Difficulty--</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}

export default DifficultySelector;
