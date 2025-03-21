import React from "react";

// Fetch questions dynamically
const fetchQuestions = async () => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/stexity/react-assessment/master/src/questions.json"
    );
    const data = await response.json();

    // Process & format the fetched data
    return data.map((item, index) => ({
      id: index + 1,
      question: decodeURIComponent(item.question),
      category: decodeURIComponent(item.category),
      difficulty: item.difficulty,
      correct_answer: decodeURIComponent(item.correct_answer),
      incorrect_answers: item.incorrect_answers.map(ans => decodeURIComponent(ans)),
    }));

  } catch (error) {
    console.error("Error fetching questions:", error);
    return []; // Return an empty array on error
  }
};

// Export fetchQuestions function
export default fetchQuestions;
