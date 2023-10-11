import questions from "../Db/questions";
import { useState } from "react";
import { useEffect } from "react";
const Question = ({ question, nextQuestion, answerPreloaded }) => {
  console.log(answerPreloaded);
  const [answerSelected, setAnswerSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  console.log(question);

  const handleChangeAnswerValue = (e) => {
    setLoading(true);
    console.log(e.target.value);
    setAnswerSelected(e.target.value);
  };

  useEffect(() => {
    setLoading(false);
  }, [answerSelected]);
  useEffect(() => {
    setAnswerSelected(question.answer);
  }, [question]);
  return (
    <div>
      <p>
        {question.index}
        {". "} {question.question}
      </p>
      <form action="#">
        {question.answers.map((answer) =>
          answerPreloaded === undefined ? (
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
              style={
                answerPreloaded === question.correctAnswer &&
                answerPreloaded === answer.option
                  ? { background: "green" }
                  : answerPreloaded === answer.option
                  ? { background: "red" }
                  : { background: "transparent" }
              }
              key={answer.option + "answer for " + question.question}
            >
              <label>
                <input
                  value={answer.option}
                  checked={answer.option===answerPreloaded}
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
          )
        )}
      </form>
      {nextQuestion !== undefined && (
        <button disabled={loading} onClick={() => nextQuestion(answerSelected)}>
          Siguiente
        </button>
      )}
    </div>
  );
};
export default Question;
