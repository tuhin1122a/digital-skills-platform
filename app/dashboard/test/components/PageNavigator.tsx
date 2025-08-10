import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Question } from "../../components/types";


interface PageNavigatorProps {
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
  questions: Question[];
  answersMap: Record<string, number>;
  questionsPerPage: number;
}

const PageNavigator = ({ totalPages, currentPage, goToPage, questions, answersMap, questionsPerPage }: PageNavigatorProps) => (
  <Card className="mt-8">
    <CardHeader><CardTitle>Page Navigator</CardTitle></CardHeader>
    <CardContent>
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
        {Array.from({ length: totalPages }, (_, pageIndex) => {
          const pageQuestions = questions.slice(pageIndex * questionsPerPage, (pageIndex + 1) * questionsPerPage);
          const answeredCount = pageQuestions.filter(q => answersMap[q.id] !== undefined).length;
          const isFullyAnswered = answeredCount === pageQuestions.length && pageQuestions.length > 0;
          const isPartiallyAnswered = answeredCount > 0 && !isFullyAnswered;

          let variantClass = "";
          if (isFullyAnswered) variantClass = "bg-green-100 border-green-300 text-green-800 hover:bg-green-200";
          else if (isPartiallyAnswered) variantClass = "bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200";

          return (
            <Button
              key={pageIndex}
              variant={currentPage === pageIndex ? "default" : "outline"}
              size="sm"
              className={`w-full h-12 relative ${variantClass}`}
              onClick={() => goToPage(pageIndex)}
            >
              <div className="text-center leading-tight">
                <div className="text-sm font-bold">{pageIndex + 1}</div>
                <div className="text-xs">{answeredCount}/{pageQuestions.length}</div>
              </div>
            </Button>
          );
        })}
      </div>
       <div className="mt-4 flex items-center justify-center flex-wrap gap-x-6 gap-y-2 text-sm">
         <div className="flex items-center space-x-2"><div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div><span>All answered</span></div>
         <div className="flex items-center space-x-2"><div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div><span>Partially answered</span></div>
         <div className="flex items-center space-x-2"><div className="w-4 h-4 bg-white border border-gray-300 rounded"></div><span>Not answered</span></div>
      </div>
    </CardContent>
  </Card>
);

export default PageNavigator;
