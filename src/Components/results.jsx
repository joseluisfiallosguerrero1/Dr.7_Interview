import { useMemo } from "react";
import Question from "./question";
const Result = ({ questions }) => {
  const calculateGrade = useMemo(() => {
    return (
      (questions.reduce((accumulator, currentQuestion) => {
        if (currentQuestion.answer === currentQuestion.correctAnswer) {
          return accumulator + 1;
        } else {
          return accumulator;
        }
      }, 0) /
        10) *
      100
    );
  }, [questions]);

  return (
    <div className="results-box">
      <div className="answer-grade">
        <div className="answer-box-bar">
          {questions.map((question) => (
            <div
              className="answer"
              style={
                question.answer === question.question.correctAnswer
                  ? { background: "#17d721d6" }
                  : { background: "#c12222c1" }
              }
            ></div>
          ))}
        </div>
        <span className="label-personalize-item"> = </span>
        <span className="label-personalize-item">{calculateGrade}%</span>
        <div className="all-answers-box">
        {questions.map((question) => (
          <Question question={question.question}  answerPreloaded={question.answer} />
        ))}
        </div>
        
      </div>
    </div>
  );
};
export default Result;
