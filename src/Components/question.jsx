import questions from "../Db/questions";
import { useState } from "react";
import { useEffect } from "react";
const Question = ({ question, nextQuestion }) => {
  const [answerSelected, setAnswerSelected] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChangeAnswerValue = (e) => {
   setLoading(true);
    console.log(e.target.value)
    setAnswerSelected(e.target.value);
  };

  useEffect(() => {
    setLoading(false);
  }, [answerSelected]);
  //  const saveQuestion=()=>{
  //     setDateRange((prevState) => ({
  //         ...prevState,
  //         startDate: newStartDate,
  //         endDate: newEndDate,
  //       }));
  //  }
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
        {question.answers.map((answer) => (
          <p key={answer.option + "answer for " + question.question}>
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
          </p>
        ))}
      </form>
      <button disabled={loading} onClick={()=>nextQuestion(answerSelected)}>
        Siguiente
      </button>
    </div>
  );
};
export default Question;
