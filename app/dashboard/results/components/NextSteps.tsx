import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download } from "lucide-react";
import { TestResult } from "../../components/types";


interface NextStepsProps {
  results: TestResult;
}

const NextSteps = ({ results }: NextStepsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>What's Next?</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {results.passed ? (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">
              🎉 Congratulations on passing Level {results.level}!
            </h3>
            <p className="text-green-800">
              You've successfully demonstrated {results.level} level digital skills.
              {results.nextLevel ? ` You can now proceed to Level ${results.nextLevel} when you're ready.` : " You have completed all levels."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/certificate" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                <Download className="h-4 w-4 mr-2" /> Download Your Certificate
              </Button>
            </Link>
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">Return to Dashboard</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-2">Don't worry, you can try again!</h3>
            <p className="text-red-800">
              You scored {results.score}% but need {results.passingScore}% to pass. Review the areas where you need improvement and retake the test when ready.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/test" className="flex-1">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Retake Test</Button>
            </Link>
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">Return to Dashboard</Button>
            </Link>
          </div>
        </div>
      )}
    </CardContent>
  </Card>
);

export default NextSteps;