import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question } from "../../components/types";


interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedAnswer?: number;
  onAnswerChange: (questionId: string, answerIndex: number) => void;
}

const QuestionCard = ({ question, questionNumber, selectedAnswer, onAnswerChange }: QuestionCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Question {questionNumber}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <p className="text-lg">{question.questionText}</p>
      <RadioGroup
        value={selectedAnswer !== undefined ? selectedAnswer.toString() : ""}
        onValueChange={(value) => onAnswerChange(question.id, Number(value))}
        className="space-y-4"
      >
        {question.options.map((option, optionIndex) => (
          <div key={optionIndex} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
            <RadioGroupItem value={optionIndex.toString()} id={`${question.id}-${optionIndex}`} />
            <Label htmlFor={`${question.id}-${optionIndex}`} className="flex-1 cursor-pointer text-base">
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </CardContent>
  </Card>
);

export default QuestionCard;