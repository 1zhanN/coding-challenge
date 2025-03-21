"use client";

import { useState, useEffect } from "react";
import "./App.css";
import QuizCard from "./components/QuizCard";
import fetchQuestions from "./data/questions"; // Ensure fetchQuestions returns a promise
import FinalScore from "./components/FinalScore";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      const fetchedQuestions = await fetchQuestions(); // Fetch questions asynchronously
      setQuestions(fetchedQuestions);
      setLoading(false);
    };
    loadQuestions();
  }, []);

  if (loading) {
    return <div className="app">Loading quiz...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correct_answer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }

    setAnsweredQuestions(answeredQuestions + 1);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setQuizComplete(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const calculateScorePercentage = () => {
    return Math.round((score / answeredQuestions) * 100) || 0;
  };

  const calculateMaxScorePercentage = () => {
    const remainingQuestions = questions.length - answeredQuestions;
    const maxPossibleScore = score + remainingQuestions;
    return Math.round((maxPossibleScore / questions.length) * 100);
  };

  return (
    <div className="app">
      {!quizComplete ? (
        <QuizCard
          question={currentQuestion}
          currentQuestionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          selectedAnswer={selectedAnswer}
          isCorrect={isCorrect}
          onAnswerSelect={handleAnswerSelect}
          onNextQuestion={handleNextQuestion}
          score={calculateScorePercentage()}
          maxScore={calculateMaxScorePercentage()}
        />
      ) : (
        <FinalScore
          score={score}
          totalQuestions={questions.length}
          percentage={calculateScorePercentage()}
          onRestart={() => {
            setCurrentQuestionIndex(0);
            setScore(0);
            setAnsweredQuestions(0);
            setSelectedAnswer(null);
            setIsCorrect(null);
            setQuizComplete(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
