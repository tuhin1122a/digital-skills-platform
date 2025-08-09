import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Download, ArrowRight, CheckCircle, XCircle, Clock, Target } from "lucide-react"
import Link from "next/link"

const testResults = {
  score: 78,
  level: "B1",
  passed: true,
  totalQuestions: 44,
  correctAnswers: 34,
  timeSpent: "38:45",
  passingScore: 70,
  nextLevel: "B2",
}

const categoryResults = [
  { category: "Digital Communication", score: 85, questions: 12 },
  { category: "Information Management", score: 72, questions: 10 },
  { category: "Digital Content Creation", score: 80, questions: 11 },
  { category: "Safety & Security", score: 75, questions: 8 },
  { category: "Problem Solving", score: 70, questions: 3 },
]

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Results</h1>
            <p className="text-gray-600">B1 Level Digital Skills Assessment</p>
          </div>

          {/* Main Score Card */}
          <Card className="text-center">
            <CardContent className="p-12">
              <div className="space-y-6">
                {/* Score Circle */}
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - testResults.score / 100)}`}
                      className={testResults.passed ? "text-green-500" : "text-red-500"}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900">{testResults.score}%</span>
                  </div>
                </div>

                {/* Result Status */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    {testResults.passed ? (
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    ) : (
                      <XCircle className="h-8 w-8 text-red-500" />
                    )}
                    <h2 className="text-2xl font-bold">{testResults.passed ? "Congratulations!" : "Not Passed"}</h2>
                  </div>

                  <p className="text-xl text-gray-700">
                    You have been certified as{" "}
                    <Badge className="text-lg px-3 py-1 bg-blue-100 text-blue-800">Level {testResults.level}</Badge>
                  </p>

                  <div className="flex items-center justify-center space-x-2">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                    <span className="text-lg font-medium">Digital Skills Level {testResults.level} Certified</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {testResults.passed && (
                    <Link href="/test">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Proceed to Next Step
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                  <Link href="/certificate">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Certificate
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Statistics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">
                  {testResults.correctAnswers}/{testResults.totalQuestions}
                </p>
                <p className="text-sm text-gray-600">Correct Answers</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{testResults.timeSpent}</p>
                <p className="text-sm text-gray-600">Time Spent</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{testResults.passingScore}%</p>
                <p className="text-sm text-gray-600">Passing Score</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">Level {testResults.level}</p>
                <p className="text-sm text-gray-600">Achieved</p>
              </CardContent>
            </Card>
          </div>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Performance by Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {categoryResults.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{category.category}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {Math.round((category.score / 100) * category.questions)}/{category.questions}
                      </span>
                      <Badge variant={category.score >= 70 ? "default" : "destructive"}>{category.score}%</Badge>
                    </div>
                  </div>
                  <Progress
                    value={category.score}
                    className={`h-2 ${category.score >= 70 ? "" : "[&>div]:bg-red-500"}`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {testResults.passed ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-2">
                      🎉 Congratulations on passing Level {testResults.level}!
                    </h3>
                    <p className="text-green-800">
                      You've successfully demonstrated {testResults.level} level digital skills. You can now proceed to
                      Level {testResults.nextLevel} when you're ready.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/certificate" className="flex-1">
                      <Button variant="outline" className="w-full bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Download Your Certificate
                      </Button>
                    </Link>
                    <Link href="/dashboard" className="flex-1">
                      <Button variant="outline" className="w-full bg-transparent">
                        Return to Dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-900 mb-2">Don't worry, you can try again!</h3>
                    <p className="text-red-800">
                      You scored {testResults.score}% but need {testResults.passingScore}% to pass. Review the areas
                      where you need improvement and retake the test when ready.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/test" className="flex-1">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Retake Test</Button>
                    </Link>
                    <Link href="/dashboard" className="flex-1">
                      <Button variant="outline" className="w-full bg-transparent">
                        Return to Dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
