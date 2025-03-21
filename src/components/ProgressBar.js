import React from 'react';

function ProgressBar({ percentage, maxPercentage, isScore }) {
  return (
    <div className={`progress-bar ${isScore ? "score-bar" : ""}`}>
      <div className="progress-fill" style={{ width: `${percentage}%` }}></div>

      {isScore && maxPercentage && (
        <>
          <div className="max-score-indicator" style={{ width: `${maxPercentage}%` }}></div>
          <div className="current-score-indicator" style={{ left: `${percentage}%` }}></div>
        </>
      )}
    </div>
  )
}

export default ProgressBar

