interface AnswerProps {
  text: string;
  textColor: string;
  isCorrect: boolean;
}

const Answer: React.FC<AnswerProps> = (props: AnswerProps) => {
  let activeClassName = `answer text-color-${props.textColor}`;
  return <div className={activeClassName}>{props.text}</div>;
};

export default Answer;
