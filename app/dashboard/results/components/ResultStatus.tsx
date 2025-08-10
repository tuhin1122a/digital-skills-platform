import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Trophy } from "lucide-react";

interface ResultStatusProps {
  passed: boolean;
  level: string;
}

const ResultStatus = ({ passed, level }: ResultStatusProps) => (
  <div className="space-y-4">
    <div className="flex items-center justify-center space-x-2">
      {passed ? (
        <CheckCircle className="h-8 w-8 text-green-500" />
      ) : (
        <XCircle className="h-8 w-8 text-red-500" />
      )}
      <h2 className="text-2xl font-bold">{passed ? "Congratulations!" : "Not Passed"}</h2>
    </div>
    <p className="text-xl text-gray-700">
      You have been certified as{" "}
      <Badge className="text-lg px-3 py-1 bg-blue-100 text-blue-800">Level {level}</Badge>
    </p>
    <div className="flex items-center justify-center space-x-2">
      <Trophy className="h-6 w-6 text-yellow-500" />
      <span className="text-lg font-medium">Digital Skills Level {level} Certified</span>
    </div>
  </div>
);

export default ResultStatus;