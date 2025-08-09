import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Clock, Target, TrendingUp, Play, CheckCircle, Lock } from "lucide-react"
import Link from "next/link"

const progressData = [
  { level: "A1", status: "completed", score: 85, unlocked: true },
  { level: "A2", status: "completed", score: 78, unlocked: true },
  { level: "B1", status: "available", score: null, unlocked: true },
  { level: "B2", status: "locked", score: null, unlocked: false },
  { level: "C1", status: "locked", score: null, unlocked: false },
  { level: "C2", status: "locked", score: null, unlocked: false },
]

const stats = [
  {
    title: "Tests Completed",
    value: "2",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Current Level",
    value: "A2",
    icon: Trophy,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Average Score",
    value: "81%",
    icon: Target,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Time Spent",
    value: "4.5h",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

export default function DashboardPage() {
  const nextAvailableTest = progressData.find((item) => item.status === "available")

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
            <p className="text-blue-100 text-lg">Ready to continue your digital certification journey?</p>
          </div>
          <div className="hidden md:block">
            <TrendingUp className="h-16 w-16 text-blue-200" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Overview */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Certification Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <span>Certification Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {progressData.map((item, index) => (
              <div key={item.level} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-2 rounded-full ${
                      item.status === "completed"
                        ? "bg-green-100"
                        : item.status === "available"
                          ? "bg-blue-100"
                          : "bg-gray-100"
                    }`}
                  >
                    {item.status === "completed" ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : item.status === "available" ? (
                      <Play className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Lock className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">Level {item.level}</h3>
                    <p className="text-sm text-gray-600">
                      {item.status === "completed"
                        ? `Score: ${item.score}%`
                        : item.status === "available"
                          ? "Ready to start"
                          : "Locked"}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={
                    item.status === "completed" ? "default" : item.status === "available" ? "secondary" : "outline"
                  }
                >
                  {item.status === "completed" ? "Completed" : item.status === "available" ? "Available" : "Locked"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span>Next Steps</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {nextAvailableTest ? (
              <div className="text-center space-y-4">
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Level {nextAvailableTest.level} Assessment</h3>
                  <p className="text-blue-700 mb-4">You're ready to take your next certification test!</p>
                  <Link href="/test">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Play className="h-4 w-4 mr-2" />
                      Start Test
                    </Button>
                  </Link>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Test Duration:</span>
                    <span className="font-medium">45 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Questions:</span>
                    <span className="font-medium">44 questions</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Passing Score:</span>
                    <span className="font-medium">70%</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="p-6 bg-green-50 rounded-lg">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-900 mb-2">All Tests Completed!</h3>
                  <p className="text-green-700">Congratulations on completing all available assessments.</p>
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Link href="/dashboard/certificates">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Trophy className="h-4 w-4 mr-2" />
                    View Certificates
                  </Button>
                </Link>
                <Link href="/dashboard/tests">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Clock className="h-4 w-4 mr-2" />
                    Test History
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="flex-1">
                <p className="font-medium">A2 Level Assessment Completed</p>
                <p className="text-sm text-gray-600">Score: 78% • 2 days ago</p>
              </div>
              <Badge>Passed</Badge>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
              <Trophy className="h-8 w-8 text-blue-600" />
              <div className="flex-1">
                <p className="font-medium">A2 Certificate Issued</p>
                <p className="text-sm text-gray-600">Digital Skills Level A2 • 2 days ago</p>
              </div>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="flex-1">
                <p className="font-medium">A1 Level Assessment Completed</p>
                <p className="text-sm text-gray-600">Score: 85% • 1 week ago</p>
              </div>
              <Badge>Passed</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
