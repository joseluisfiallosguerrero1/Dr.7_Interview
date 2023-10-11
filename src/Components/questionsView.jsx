import questions from "../Db/questions";
import { useState } from "react";
import Result from "./results";
import { useEffect } from "react";
import Question from "./question";

const QuestionsView = () => {
  const [allQuestionsInterview, setAllquestionsInterview] = useState([]);
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState([]);
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
  useEffect(() => {
    console.log(allQuestionsInterview);
  }, [allQuestionsInterview]);

  const nextQuestion = (answer) => {
    console.log(answer);
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
    <div>
      {page < 10 ? (
        <Question
          key={"this_is_question_" + allQuestionsInterview[page].question}
          question={allQuestionsInterview[page].question}
          nextQuestion={nextQuestion}
        />
      ) : (
        <Result questions={allQuestionsInterview} />
      )}
    </div>
  );
};
export default QuestionsView;
