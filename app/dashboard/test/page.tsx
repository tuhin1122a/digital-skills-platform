"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { clearAnswers, saveAnswer } from "@/features/testAnswers/testAnswersSlice";

import { Question } from "../components/types";
import { LoadingScreen, NoQuestionsScreen, SubmittingScreen } from "./components/StatusScreens";
import TestHeader from "./components/TestHeader";
import TestProgress from "./components/TestProgress";
import QuestionList from "./components/QuestionList";
import TestNavigation from "./components/TestNavigation";
import PageNavigator from "./components/PageNavigator";
import SubmitDialog from "./components/SubmitDialog";

const QUESTIONS_PER_PAGE = 5;

export default function TestPage() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const reduxAnswers = useSelector((state: RootState) => state.testAnswers.answers);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  const accessToken = (session?.user as any)?.accessToken || "";
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  // Map answers array to object { questionId: answerIndex }
  const answersMap = reduxAnswers.reduce<Record<string, number>>((acc, ans) => {
    acc[ans.questionId] = ans.answer;
    return acc;
  }, {});

  // Fetch questions on mount and session change
  useEffect(() => {
    if (session?.user?.id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/${session.user.id}?t=${Date.now()}`, {
        headers: { Authorization: `Bearer ${accessToken}`, "Cache-Control": "no-store" },
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) setQuestions(data?.data?.questions || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [session, accessToken]);

  // Timer countdown & auto submit
  useEffect(() => {
    if (timeLeft > 0 && !testSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !testSubmitted) {
      handleSubmit(true);
    }
  }, [timeLeft, testSubmitted]);

  const handleAnswerChange = (questionId: string, answerIndex: number) => {
    dispatch(saveAnswer({ questionId, answer: answerIndex }));
  };

  const handleSubmit = async (isAutoSubmit = false) => {
    if (questions.length === 0) return;
    setTestSubmitted(true);
    setShowSubmitDialog(false);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/results/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({
          userId: session?.user?.id,
          level: questions[0]?.level || "A1",
          competency: questions[0]?.competency,
          answers: reduxAnswers.map(({ questionId, answer }) => ({ questionId, selectedOption: answer })),
        }),
      });
      if (response.ok) {
        dispatch(clearAnswers());
        window.location.href = "/dashboard/results";
      } else {
        setTestSubmitted(false);
        alert("Failed to submit. Please try again.");
      }
    } catch (error) {
      setTestSubmitted(false);
      alert("Network error, please try again.");
    }
  };

  if (loading) return <LoadingScreen />;
  if (!questions.length) return <NoQuestionsScreen />;
  if (testSubmitted) return <SubmittingScreen />;

  const currentPageQuestions = questions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <TestHeader
        currentPage={currentPage}
        currentLevel={questions[0]?.level || "N/A"}
        timeLeft={timeLeft}
      />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <TestProgress
          currentPage={currentPage}
          totalPages={totalPages}
          totalAnswered={reduxAnswers.length}
          totalQuestions={questions.length}
          questionsOnPage={currentPageQuestions}
          answersMap={answersMap}
        />
        <QuestionList
          questions={currentPageQuestions}
          onAnswerChange={handleAnswerChange}
          answersMap={answersMap}
          pageStartIndex={currentPage * QUESTIONS_PER_PAGE}
        />
        <TestNavigation
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={() => setCurrentPage(p => p - 1)}
          onNext={() => setCurrentPage(p => p + 1)}
          onFinish={() => setShowSubmitDialog(true)}
        />
        <PageNavigator
          totalPages={totalPages}
          currentPage={currentPage}
          goToPage={setCurrentPage}
          questions={questions}
          answersMap={answersMap}
          questionsPerPage={QUESTIONS_PER_PAGE}
        />
      </main>
      <SubmitDialog
        isOpen={showSubmitDialog}
        onOpenChange={setShowSubmitDialog}
        onConfirm={() => handleSubmit(false)}
        totalAnswered={reduxAnswers.length}
        totalQuestions={questions.length}
      />
    </div>
  );
}
