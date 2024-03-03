// App.js
import React, { useState, useEffect } from "react";
import Header from "./Header";
import CategorySelector from "./Category";
import DifficultySelector from "./Difficulty";
import Quiz from "./Quiz";
import ReportCard from "./ReportCard";

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const startQuiz = () => {
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data.results);
        setQuizStarted(true);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  };

  const handleAnswerSelect = (answer) => {
    setUserAnswers([...userAnswers, answer]);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };
  const resetQuiz = () => {
    setSelectedCategory("");
    setSelectedDifficulty("");
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizStarted(false);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h2>TOP QUIZ</h2>
        {!quizStarted && (
          <>
            <CategorySelector
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <DifficultySelector
              selectedDifficulty={selectedDifficulty}
              onSelectDifficulty={setSelectedDifficulty}
            />
            <button onClick={startQuiz} className="btn">
              Start Quiz
            </button>
          </>
        )}
        {quizStarted &&
          questions.length > 0 &&
          currentQuestionIndex < questions.length && (
            <Quiz
              question={questions[currentQuestionIndex]}
              currentIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              onAnswerSelect={handleAnswerSelect}
              onNext={handleNextQuestion}
              onPrevious={handlePreviousQuestion}
            />
          )}

        {currentQuestionIndex === questions.length && (
          <ReportCard
            questions={questions}
            userAnswers={userAnswers}
            onResetQuiz={resetQuiz}
          />
        )}
      </div>
    </div>
  );
}

export default App;
