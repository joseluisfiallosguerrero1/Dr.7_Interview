import questions from "../Db/questions";
import { useState } from "react";
import Result from "./results";
import { useEffect } from "react";
import Question from "./question";

const QuestionsView = () => {
  const [allQuestionsInterview, setAllquestionsInterview] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    let allQuestionsTempArray = [];
    const randomQuestionList = randomNumbers();
    randomQuestionList.forEach((questionNumber) => {
      allQuestionsTempArray.push({
        question: questions[questionNumber - 1],
        answer: 0,
      });
    });
    setAllquestionsInterview(allQuestionsTempArray);
  }, []);
  useEffect(() => {}, [allQuestionsInterview]);

  const nextQuestion = (answer) => {
    let tempQuestions = [...allQuestionsInterview];
    tempQuestions[page].answer = parseInt(answer);
    setAllquestionsInterview(tempQuestions);
    setPage(page + 1);
  };

  const generateUniqueRandomNumbers = (
    arr,
    _currentValue,
    _currentIndex,
    _array
  ) => {
    let randomNum;

    do {
      randomNum = Math.floor(Math.random() * 10) + 1;
    } while (arr.includes(randomNum));

    arr.push(randomNum);
    return arr;
  };

  const randomNumbers = () =>
    Array.from({ length: 10 }).reduce(generateUniqueRandomNumbers, []);

  if (allQuestionsInterview.length === 0) {
    return <></>;
  }
  return (
    <div className="card full-application">
      {page < 10 ? (
        <div className="main-questionary">
          <h1 className="main-title">Capitals of the World</h1>
          <h6 className="sub-title-main-view">
            Select the answer that suits you for each of the queries, then press
            next button to advance to the next query, at the end you will see a
            panel with the results of your answers.
          </h6>
          <Question
            key={"this_is_question_" + allQuestionsInterview[page].question}
            question={allQuestionsInterview[page].question}
            answerPreloaded={allQuestionsInterview[page].answer}
            nextQuestion={nextQuestion}
            index={page + 1}
          />
        </div>
      ) : (
        <Result questions={allQuestionsInterview} />
      )}
    </div>
  );
};
export default QuestionsView;
