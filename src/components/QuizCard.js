"use client";
import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import DifficultyStars from "./DifficultyStars";
import fetchQuestions from "../data/questions.js";

function QuizCard({
  currentQuestionNumber,
  totalQuestions,
  selectedAnswer,
  isCorrect,
  onAnswerSelect,
  onNextQuestion,
  score,
  maxScore,
}) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      const fetchedQuestions = await fetchQuestions();
      setQuestions(fetchedQuestions);
      setLoading(false);
    };
    loadQuestions();
  }, []);

  if (loading) {
    return <div className="quiz-card">Loading questions...</div>;
  }

  const question = questions[currentQuestionNumber - 1];
  if (!question) {
    return <div className="quiz-card">No more questions.</div>;
  }

  const progressPercentage = (currentQuestionNumber / totalQuestions) * 100;

  // Combine correct and incorrect answers, then shuffle them
  const options = [...question.incorrect_answers, question.correct_answer].sort(
    () => Math.random() - 0.5
  );

  return (
    <div className="quiz-card">
      <div className="progress-container">
        <ProgressBar percentage={progressPercentage} />
      </div>

      <div className="question-header">
        <h2>
          Question {currentQuestionNumber} of {totalQuestions}
        </h2>
        <div className="category-difficulty">
          <p>{question.category}</p>
          <DifficultyStars difficulty={question.difficulty} />
        </div>
      </div>

      <div className="question-content">
        <p>{question.question}</p>
      </div>

      <div className="answer-options">
        {options.map((option, index) => (
          <button
            key={index}
            className={`answer-button ${
              selectedAnswer === option
                ? option === question.correct_answer
                  ? "correct"
                  : "incorrect"
                : ""
            } ${selectedAnswer && option === question.correct_answer ? "correct" : ""}`}
            onClick={() => !selectedAnswer && onAnswerSelect(option)}
            disabled={selectedAnswer !== null}
          >
            {option}
          </button>
        ))}
      </div>

      {selectedAnswer && (
        <div className="feedback">
          <p>{isCorrect ? "Correct!" : "Sorry!"}</p>
          <button className="next-button" onClick={onNextQuestion}>
            Next Question
          </button>
        </div>
      )}

      <div className="score-container">
        <div className="score-text">
          <span>Score: {score}%</span>
          <span>Max Score: {maxScore}%</span>
        </div>
        <ProgressBar percentage={score} maxPercentage={maxScore} isScore={true} />
      </div>
    </div>
  );
}

export default QuizCard;
