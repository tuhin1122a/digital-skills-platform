import { Clock } from "lucide-react";

interface TestHeaderProps {
  currentPage: number;
  currentLevel: string;
  timeLeft: number;
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const TestHeader = ({ currentPage, currentLevel, timeLeft }: TestHeaderProps) => (
  <header className="bg-white shadow-sm border-b sticky top-0 z-10">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Step {currentPage + 1}: {currentLevel} Level Assessment</h1>
        <p className="text-gray-600">Digital Skills Certification Test</p>
      </div>
      <div className="flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-lg">
        <Clock className="h-5 w-5 text-red-600" />
        <span className={`font-mono text-lg font-bold ${timeLeft < 300 ? "text-red-600" : "text-gray-900"}`}>
          {formatTime(timeLeft)}
        </span>
      </div>
    </div>
  </header>
);

export default TestHeader;
