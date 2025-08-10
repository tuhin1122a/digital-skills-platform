import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TestNavigationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
}

const TestNavigation = ({ currentPage, totalPages, onPrevious, onNext, onFinish }: TestNavigationProps) => (
  <div className="flex justify-between items-center">
    <Button variant="outline" onClick={onPrevious} disabled={currentPage === 0}>
      <ChevronLeft className="h-4 w-4 mr-2" /> Previous Page
    </Button>
    {currentPage === totalPages - 1 ? (
      <Button onClick={onFinish} className="bg-green-600 hover:bg-green-700">
        Finish Test
      </Button>
    ) : (
      <Button onClick={onNext}>
        Next Page <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    )}
  </div>
);

export default TestNavigation;