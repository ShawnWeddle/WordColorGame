import { useState, useEffect } from "react";
import { shuffle } from "lodash";
import Answer from "./Answer";

const randomInt = (number: number) => {
  return Math.floor(Math.random() * Math.floor(number));
};

const colorNames: string[] = [
  "white",
  "black",
  "red",
  "blue",
  "green",
  "brown",
  "orange",
  "purple",
  "pink",
];

const QuizPiece = () => {
  const [correctAnswer, setCorrectAnswer] = useState<string>();
  const [colorPairs, setColorPairs] = useState<[[string, string]]>();

  useEffect(() => {
    const removeColorIndex = randomInt(9);
    const shuffledColorNames = shuffle(colorNames);
    setCorrectAnswer(shuffledColorNames[removeColorIndex]);
    const nonStateCorrectAnswer = shuffledColorNames[removeColorIndex];
    shuffledColorNames.splice(removeColorIndex, 1);
    const shuffledColorColors = JSON.parse(JSON.stringify(shuffledColorNames));
    shuffledColorColors.unshift("", "", "");
    shuffledColorColors[0] = shuffledColorColors[8];
    shuffledColorColors[1] = shuffledColorColors[9];
    shuffledColorColors[2] = shuffledColorColors[10];
    shuffledColorColors.splice(8, 3);

    const insertColorIndex = randomInt(8);
    shuffledColorNames.splice(insertColorIndex, 0, nonStateCorrectAnswer);
    shuffledColorColors.splice(insertColorIndex, 0, nonStateCorrectAnswer);

    const finalColorPairs: [[string, string]] = [["", ""]];
    for (let i = 0; i < 9; i++) {
      finalColorPairs[i] = [shuffledColorNames[i], shuffledColorColors[i]];
    }
    setColorPairs(finalColorPairs);
  }, []);

  const answers = colorPairs?.map((item, index) => {
    return (
      <Answer
        key={index}
        text={item[0]}
        textColor={item[1]}
        isCorrect={item[0] === correctAnswer}
      />
    );
  });

  return <div className="quiz-piece">{answers}</div>;
};

export default QuizPiece;
