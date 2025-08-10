import { Card, CardContent } from "@/components/ui/card";
import { TestResult } from "../../components/types";
import ScoreCircle from "./ScoreCircle";
import ResultStatus from "./ResultStatus";
import ActionButtons from "./ActionButtons";


interface ScoreCardProps {
  results: TestResult;
}

const ScoreCard = ({ results }: ScoreCardProps) => (
  <Card className="text-center">
    <CardContent className="p-12">
      <div className="space-y-6">
        <ScoreCircle score={results.score} passed={results.passed} />
        <ResultStatus passed={results.passed} level={results.level} />
        <ActionButtons passed={results.passed} />
      </div>
    </CardContent>
  </Card>
);

export default ScoreCard;