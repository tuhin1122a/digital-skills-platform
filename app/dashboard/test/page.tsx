"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Clock, ChevronLeft, ChevronRight, Flag } from "lucide-react"

const sampleQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of a web browser?",
    options: [
      "To create websites",
      "To access and display web pages",
      "To store files on the internet",
      "To send emails",
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Which of the following is a cloud storage service?",
    options: ["Microsoft Word", "Google Drive", "Adobe Photoshop", "Windows Media Player"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "What does 'URL' stand for?",
    options: [
      "Universal Resource Locator",
      "Uniform Resource Locator",
      "Universal Reference Link",
      "Uniform Reference Locator",
    ],
    correctAnswer: 1,
  },
]

export default function TestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(45 * 60) // 45 minutes in seconds
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [testSubmitted, setTestSubmitted] = useState(false)

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !testSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !testSubmitted) {
      handleAutoSubmit()
    }
  }, [timeLeft, testSubmitted])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setTestSubmitted(true)
    setShowSubmitDialog(false)
    // Redirect to results page
    setTimeout(() => {
      window.location.href = "/results"
    }, 1000)
  }

  const handleAutoSubmit = () => {
    setTestSubmitted(true)
    // Auto-submit when time runs out
    setTimeout(() => {
      window.location.href = "/results"
    }, 2000)
  }

  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100
  const answeredQuestions = Object.keys(answers).length

  if (testSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-bold mb-2">Submitting Your Test...</h2>
            <p className="text-gray-600">Please wait while we process your answers.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Step 1: B1 Level Assessment</h1>
              <p className="text-gray-600">Digital Skills Certification Test</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-lg">
                <Clock className="h-5 w-5 text-red-600" />
                <span className={`font-mono text-lg font-bold ${timeLeft < 300 ? "text-red-600" : "text-gray-900"}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Question {currentQuestion + 1} of {sampleQuestions.length}
              </span>
              <span className="text-sm text-gray-600">{answeredQuestions} answered</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Question {currentQuestion + 1}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-gray-800">{sampleQuestions[currentQuestion].question}</p>

              <RadioGroup
                value={answers[sampleQuestions[currentQuestion].id]?.toString()}
                onValueChange={(value) =>
                  handleAnswerChange(sampleQuestions[currentQuestion].id, Number.parseInt(value))
                }
                className="space-y-4"
              >
                {sampleQuestions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowSubmitDialog(true)}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <Flag className="h-4 w-4 mr-2" />
                Submit Test
              </Button>

              {currentQuestion < sampleQuestions.length - 1 ? (
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={() => setShowSubmitDialog(true)} className="bg-green-600 hover:bg-green-700">
                  Finish Test
                </Button>
              )}
            </div>
          </div>

          {/* Question Navigator */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Question Navigator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-10 gap-2">
                {sampleQuestions.map((_, index) => (
                  <Button
                    key={index}
                    variant={currentQuestion === index ? "default" : "outline"}
                    size="sm"
                    className={`w-10 h-10 ${
                      answers[sampleQuestions[index].id] !== undefined
                        ? "bg-green-100 border-green-300 text-green-800"
                        : ""
                    }`}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Test Confirmation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to submit your test? You have answered <strong>{answeredQuestions}</strong> out of{" "}
              <strong>{sampleQuestions.length}</strong> questions.
            </p>

            {answeredQuestions < sampleQuestions.length && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Warning:</strong> You have {sampleQuestions.length - answeredQuestions} unanswered questions.
                  These will be marked as incorrect.
                </p>
              </div>
            )}

            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => setShowSubmitDialog(false)} className="flex-1">
                Continue Test
              </Button>
              <Button onClick={handleSubmit} className="flex-1 bg-red-600 hover:bg-red-700">
                Submit Test
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
