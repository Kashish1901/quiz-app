import React from "react";

function Quiz({
  question,
  currentIndex,
  totalQuestions,
  onAnswerSelect,
  onNext,
  onPrevious,
}) {
  const handleAnswerSelect = (answer) => {
    onAnswerSelect(answer);
  };

  const handleNextClick = () => {
    onNext();
  };
  const handlePreviousClick = () => {
    onPrevious();
  };
  return (
    <div>
      <h3>
        Question {currentIndex + 1}/{totalQuestions}
      </h3>
      <p>{question.question}</p>
      <ul>
        {question.incorrect_answers.map((option, index) => (
          <li key={index}>
            <button
              className="btn-ques"
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </button>
          </li>
        ))}
        <li className="active">
          <button
            onClick={() => handleAnswerSelect(question.correct_answer)}
            className="btn-ques"
          >
            {question.correct_answer}
          </button>
        </li>
      </ul>
      <button onClick={handleNextClick} className="btn">
        Next
      </button>
      <button onClick={handlePreviousClick} className="btn">
        Previous
      </button>
    </div>
  );
}

export default Quiz;
