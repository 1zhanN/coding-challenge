"use client"

function FinalScore({ score, totalQuestions, percentage, onRestart }) {
  
  // Determine message based on score percentage
  let message = ""
  if (percentage >= 90) {
    message = "Excellent! You're a trivia master!"
  } else if (percentage >= 70) {
    message = "Great job! You know your stuff!"
  } else if (percentage >= 50) {
    message = "Good effort! You passed the quiz."
  } else {
    message = "Better luck next time!"
  }

  return (
    <div className="quiz-card final-score">
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "100%" }}></div>
        </div>
      </div>

      <div className="final-score-header">
        <h2>Quiz Complete!</h2>
      </div>

      <div className="final-score-content">
        <div className="score-circle">
          <div className="score-number">{percentage}%</div>
        </div>

        <p className="score-details">
          You scored {score} out of {totalQuestions} questions correctly.
        </p>

        <p className="score-message">{message}</p>
      </div>

      <div className="final-score-actions">
        <button className="restart-button" onClick={onRestart}>
          Try Again
        </button>
      </div>
    </div>
  )
}

export default FinalScore

