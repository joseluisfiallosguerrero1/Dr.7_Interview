
import { useState } from "react";
import { useEffect } from "react";
const Question = ({ question, nextQuestion, answerPreloaded, index }) => {
  const [answerSelected, setAnswerSelected] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChangeAnswerValue = (e) => {
    setLoading(true);
    setAnswerSelected(e.target.value);
  };

  useEffect(() => {
    setLoading(false);
  }, [answerSelected]);
  useEffect(() => {
    setAnswerSelected(question.answer);
  }, [question]);
  return (
    <div className="card horizontal single-question">
      <h4 className="card-content">
        {index}
        {". "} {question.question}
      </h4>
      <form className="answer-option-box card-action" action="#">
        {question.answers.map((answer) =>
          nextQuestion !== undefined ? (
            <div key={answer.option + "answer for " + question.question}>
              <label>
                <input
                  value={answer.option}
                  onChange={(e) => handleChangeAnswerValue(e)}
                  class="with-gap"
                  name="group1"
                  type="radio"
                />
                <span>
                  {answer.option}
                  {". "}
                  {answer.item}
                </span>
              </label>
            </div>
          ) : (
            <div
              className="complete-answer"
              style={
                answerPreloaded === question.correctAnswer &&
                answerPreloaded === answer.option
                  ? { background: "#17d72137" }
                  : answerPreloaded === answer.option
                  ? { background: " #c122223f" }
                  : { background: "transparent" }
              }
              key={answer.option + "answer for " + question.question}
            >
              <label>
                <input
                  value={answer.option}
                  checked={answer.option === answerPreloaded}
                  onChange={(e) => handleChangeAnswerValue(e)}
                  class="with-gap"
                  name="group1"
                  type="radio"
                />

                <span>
                  {answer.option}
                  {". "}
                  {answer.item}
                </span>
              </label>
              <span>
                {question.correctAnswer === answer.option && "Correct Answer"}
              </span>
            </div>
          )
        )}
      </form>
      {nextQuestion !== undefined && (
        <div className="buttons-box">
          <button
            className="waves-effect waves-light btn"
            disabled={loading}
            onClick={() => nextQuestion(answerSelected)}
          >
            Next
          </button>{" "}
        </div>
      )}
    </div>
  );
};
export default Question;
