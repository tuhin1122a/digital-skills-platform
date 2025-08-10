import { Question } from "../../components/types";
import QuestionCard from "./QuestionCard";



interface QuestionListProps {
  questions: Question[];
  onAnswerChange: (questionId: string, answerIndex: number) => void;
  answersMap: Record<string, number>;
  pageStartIndex: number;
}

const QuestionList = ({ questions, onAnswerChange, answersMap, pageStartIndex }: QuestionListProps) => (
  <div className="space-y-6 mb-8">
    {questions.map((question, index) => (
      <QuestionCard
        key={question.id}
        question={question}
        questionNumber={pageStartIndex + index + 1}
        selectedAnswer={answersMap[question.id]}
        onAnswerChange={onAnswerChange}
      />
    ))}
  </div>
);

export default QuestionList;
