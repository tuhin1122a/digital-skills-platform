import { auth } from "@/auth";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import ScoreCard from "./components/ScoreCard";
import StatsGrid from "./components/StatsGrid";
import NextSteps from "./components/NextSteps";
import { TestResult } from "../components/types";

// Helper function to determine the next level
function getNextLevel(level: string): string | null {
  const levelMap: Record<string, string | null> = {
    A1: "A2", A2: "B1", B1: "B2", B2: "C1", C1: "C2", C2: null,
  };
  return levelMap[level] ?? null;
}

// Data fetching and processing function
async function getTestResults(accessToken: string): Promise<TestResult> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/results/my-results`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch results: ${res.statusText}`);
  }

  const data = await res.json();

  if (data.success && data.data) {
    const r = data.data.result;
    const passingScore = 25;
    return {
      score: r.score,
      level: r.certifiedLevel,
      passingScore: passingScore,
      passed: r.score >= passingScore,
      totalQuestions: r.totalQuestions,
      correctAnswers: r.correctAnswers,
      timeSpent: "45 minutes", // Hardcoded as per original
      nextLevel: getNextLevel(r.certifiedLevel),
    };
  } else {
    throw new Error(data.message || "Invalid data received from API");
  }
}

export default async function ResultsPage() {
  const session = await auth();
  const accessToken = (session?.user as any)?.accessToken as string | undefined;

  if (!accessToken) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <p>Unauthorized. Please login to see your test results.</p>
      </div>
    );
  }

  try {
    const testResults = await getTestResults(accessToken);

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Results</h1>
              <p className="text-gray-600">{testResults.level} Level Digital Skills Assessment</p>
            </div>

            <ScoreCard results={testResults} />
            <StatsGrid results={testResults} />
            <NextSteps results={testResults} />

          </div>
        </div>
      </div>
    );
  } catch (error: any) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <p>Error loading test results: {error.message}</p>
      </div>
    );
  }
}