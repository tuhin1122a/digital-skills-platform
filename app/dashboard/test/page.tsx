"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Clock, ChevronLeft, ChevronRight } from "lucide-react"

interface Question {
  id: string
  competency: string
  level: string // ex: "A1", "B2"
  questionText: string
  options: string[]
}

const QUESTIONS_PER_PAGE = 5

export default function TestPage() {
  const { data: session } = useSession()
  const [sampleQuestions, setSampleQuestions] = useState<Question[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [timeLeft, setTimeLeft] = useState(45 * 60)
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [testSubmitted, setTestSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)

  const totalPages = Math.ceil(sampleQuestions.length / QUESTIONS_PER_PAGE)

  const getCurrentPageQuestions = () => {
    const startIndex = currentPage * QUESTIONS_PER_PAGE
    const endIndex = startIndex + QUESTIONS_PER_PAGE
    return sampleQuestions.slice(startIndex, endIndex)
  }

  const accessToken = (session?.user as any)?.accessToken || ""

  useEffect(() => {
    if (session?.user?.id) {
      const userId = session.user.id
      const timestamp = Date.now() // cache busting এর জন্য

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/${userId}?t=${timestamp}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Cache-Control": "no-store", // ক্যাশিং বন্ধ রাখবে
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setSampleQuestions(data?.data?.questions || [])
          } else {
            setSampleQuestions([])
          }
          setLoading(false)
        })
        .catch(() => {
          setSampleQuestions([])
          setLoading(false)
        })
    }
  }, [session, accessToken])

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

  const handleAnswerChange = (questionId: string, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex)
  }

  const handleSubmit = async () => {
    if (sampleQuestions.length === 0) return

    const level = sampleQuestions[0]?.level || "A1"
    const competencyFromQuestion = sampleQuestions[0]?.competency

    const answersArray = Object.entries(answers).map(([questionId, selectedOption]) => ({
      questionId,
      selectedOption,
    }))

    setTestSubmitted(true)
    setShowSubmitDialog(false)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/results/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          level,
          competency: competencyFromQuestion,
          answers: answersArray,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setTimeout(() => {
          window.location.href = "/dashboard/results"
        }, 1000)
      } else {
        setTestSubmitted(false)
      }
    } catch (error) {
      setTestSubmitted(false)
    }
  }

  const handleAutoSubmit = () => {
    setTestSubmitted(true)
    setTimeout(() => {
      window.location.href = "/dashboard/results"
    }, 2000)
  }

  const progress = ((currentPage + 1) / totalPages) * 100
  const answeredQuestions = Object.keys(answers).length
  const currentPageQuestions = getCurrentPageQuestions()
  const currentPageAnswered = currentPageQuestions.filter((q) => answers[q.id] !== undefined).length

  const currentLevel = currentPageQuestions.length > 0 ? currentPageQuestions[0].level : "N/A"

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading questions...</div>
      </div>
    )
  }

  if (!sampleQuestions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>No questions available for your level.</div>
      </div>
    )
  }

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
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Step {currentPage + 1}: {currentLevel} Level Assessment
            </h1>
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">
              Page {currentPage + 1} of {totalPages} ({currentPageAnswered}/{currentPageQuestions.length} answered on this page)
            </span>
            <span className="text-sm text-gray-600">
              {answeredQuestions} of {sampleQuestions.length} total answered
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Questions */}
        <div className="space-y-6 mb-8">
          {currentPageQuestions.map((question, index) => {
            const questionNumber = currentPage * QUESTIONS_PER_PAGE + index + 1
            return (
              <Card key={question.id}>
                <CardHeader>
                  <CardTitle>Question {questionNumber}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg">{question.questionText}</p>
                  <RadioGroup
                    value={answers[question.id] !== undefined ? answers[question.id].toString() : ""}
                    onValueChange={(value) => handleAnswerChange(question.id, Number.parseInt(value))}
                    className="space-y-4"
                  >
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <RadioGroupItem value={optionIndex.toString()} id={`${question.id}-option-${optionIndex}`} />
                        <Label htmlFor={`${question.id}-option-${optionIndex}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handlePreviousPage} disabled={currentPage === 0}>
            <ChevronLeft className="h-4 w-4 mr-2" /> Previous Page
          </Button>

          <div className="flex items-center space-x-4">
            {currentPage === totalPages - 1 && (
              <Button onClick={() => setShowSubmitDialog(true)} className="bg-green-600">
                Finish Test
              </Button>
            )}

            {currentPage < totalPages - 1 && (
              <Button onClick={handleNextPage}>
                Next Page <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Page Navigator */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Page Navigator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-10 gap-2">
              {Array.from({ length: totalPages }, (_, pageIndex) => {
                const pageStartIndex = pageIndex * QUESTIONS_PER_PAGE
                const pageEndIndex = Math.min(pageStartIndex + QUESTIONS_PER_PAGE, sampleQuestions.length)
                const pageQuestions = sampleQuestions.slice(pageStartIndex, pageEndIndex)
                const pageAnsweredCount = pageQuestions.filter((q) => answers[q.id] !== undefined).length
                const isPageFullyAnswered = pageAnsweredCount === pageQuestions.length
                const hasPartialAnswers = pageAnsweredCount > 0 && pageAnsweredCount < pageQuestions.length

                return (
                  <Button
                    key={pageIndex}
                    variant={currentPage === pageIndex ? "default" : "outline"}
                    size="sm"
                    className={`w-12 h-12 relative ${
                      isPageFullyAnswered
                        ? "bg-green-100 border-green-300 text-green-800 hover:bg-green-200"
                        : hasPartialAnswers
                        ? "bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200"
                        : ""
                    }`}
                    onClick={() => goToPage(pageIndex)}
                  >
                    <div className="text-center">
                      <div className="text-xs font-bold">{pageIndex + 1}</div>
                      <div className="text-xs">
                        {pageAnsweredCount}/{pageQuestions.length}
                      </div>
                    </div>
                  </Button>
                )
              })}
            </div>
            <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                <span>All answered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                <span>Partially answered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
                <span>Not answered</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submit Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Test Confirmation</DialogTitle>
          </DialogHeader>
          <p>
            You have answered {answeredQuestions} of {sampleQuestions.length} questions.
          </p>
          {answeredQuestions < sampleQuestions.length && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-yellow-800 text-sm">
              Warning: {sampleQuestions.length - answeredQuestions} unanswered questions will be marked incorrect.
            </div>
          )}
          <div className="flex space-x-4 mt-4">
            <Button variant="outline" onClick={() => setShowSubmitDialog(false)} className="flex-1">
              Continue Test
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Submit Test
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
