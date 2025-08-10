import { Progress } from "@/components/ui/progress";
import { Question } from "../../components/types";

interface TestProgressProps {
  currentPage: number;
  totalPages: number;
  totalAnswered: number;
  totalQuestions: number;
  questionsOnPage: Question[];
  answersMap: Record<string, number>;
}

const TestProgress = ({
  currentPage, totalPages, totalAnswered, totalQuestions, questionsOnPage, answersMap
}: TestProgressProps) => {
  const progress = totalPages > 0 ? ((currentPage + 1) / totalPages) * 100 : 0;
  const answeredOnPage = questionsOnPage.filter(q => answersMap[q.id] !== undefined).length;

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">
          Page {currentPage + 1} of {totalPages} ({answeredOnPage}/{questionsOnPage.length} answered on this page)
        </span>
        <span className="text-sm text-gray-600">
          {totalAnswered} of {totalQuestions} total answered
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default TestProgress;