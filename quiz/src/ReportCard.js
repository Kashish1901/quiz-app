import React from "react";

function ReportCard({ questions, userAnswers, onResetQuiz }) {
  const calculateScore = () => {
    let correctAnswers = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].correct_answer) {
        correctAnswers++;
      }
    }
    return ((correctAnswers / questions.length) * 100).toFixed(2);
  };

  return (
    <div>
      <h2>Report Card</h2>
      <p>Percentage of Right Answers: {calculateScore()}%</p>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <p>
              <strong>Question:</strong> {question.question}
            </p>
            <p>
              <strong>Your Answer:</strong> {userAnswers[index]}
            </p>
            <p>
              <strong>Correct Answer:</strong> {question.correct_answer}
            </p>
          </li>
        ))}
      </ul>
      <button onClick={onResetQuiz} className="btn">
        Restart Quiz
      </button>
    </div>
  );
}

export default ReportCard;
