import React from 'react';

function ProgressBar({ percentage, maxPercentage, isScore, minPercentage }) {
  return (
    <div className={`progress-bar ${isScore ? "score-bar" : ""}`}>
      {isScore && minPercentage !== undefined ? (
        <>
          {/* Background - full width very light gray (beyond max score) */}
          <div className="score-background"></div>

          {/* Max score section - light gray (up to max score) */}
          <div className="max-score-section" style={{ width: `${maxPercentage}%` }}></div>

          {/* Current score section - dark gray */}
          <div
            className="current-score-section"
            style={{ width: `${percentage - minPercentage}%`, left: `${minPercentage}%` }}
          ></div>

          {/* Min score section - black */}
          <div className="min-score-section" style={{ width: `${minPercentage}%` }}></div>

          {/* Max score indicator - vertical dashed line */}
          <div className="max-score-section" style={{ left: `${maxPercentage}%` }}></div>
        </>
      ) : (
        <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
      )}
    </div>
  )
}

export default ProgressBar


