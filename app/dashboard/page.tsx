import { auth } from "@/auth";
import { fetchUserProgress } from "@/lib/fetchUserProgressData";
import { fetchRecentActivity } from "@/lib/fetchRecentActivity";


import WelcomeBanner from "./components/WelcomeBanner";
import StatsGrid from "./components/StatsGrid";
import CertificationProgress from "./components/CertificationProgress";
import NextSteps from "./components/NextSteps";
import RecentActivity from "./components/RecentActivity";
import { CheckCircle, Trophy, Target, Clock } from "lucide-react";
import { ProgressItem, RecentActivityItem, Stat } from "./components/types";

// --- HELPER FUNCTIONS --- //
const levelOrder = ["A1", "A2", "B1", "B2", "C1", "C2"];

function getCurrentLevel(progressData: ProgressItem[]): string {
  const availableLevel = progressData.find(item => item.status === "available");
  if (availableLevel) {
    return availableLevel.level;
  }

  const lastCompletedLevel = levelOrder
    .slice()
    .reverse()
    .find(level =>
      progressData.some(p => p.level === level && p.status === "completed")
    );

  return lastCompletedLevel || "A1";
}


// --- MAIN DASHBOARD PAGE COMPONENT --- //
export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return <p className="p-8 text-center">Please login to see your dashboard.</p>;
  }

  const user = session.user as { id: string; name: string; accessToken: string };

  // Data fetching
  const progressData: ProgressItem[] = await fetchUserProgress(user.id, user.accessToken);
  const recentActivityData: RecentActivityItem[] = await fetchRecentActivity(user.id, user.accessToken);

  // Data processing
  const completedTests = progressData.filter((item) => item.status === "completed");
  const testsCompletedCount = completedTests.length;
  const currentLevel = getCurrentLevel(progressData);

  const averageScore =
    testsCompletedCount > 0
      ? `${Math.round(completedTests.reduce((acc, cur) => acc + (cur.score ?? 0), 0) / testsCompletedCount)}%`
      : "0%";

  const totalMinutes = testsCompletedCount * 45;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const timeSpent = `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;

  const nextAvailableTest = progressData.find((item) => item.status === "available");

  const stats: Stat[] = [
    { title: "Tests Completed", value: testsCompletedCount.toString(), icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-100" },
    { title: "Current Level", value: currentLevel, icon: Trophy, color: "text-blue-600", bgColor: "bg-blue-100" },
    { title: "Average Score", value: averageScore, icon: Target, color: "text-purple-600", bgColor: "bg-purple-100" },
    { title: "Time Spent", value: timeSpent, icon: Clock, color: "text-orange-600", bgColor: "bg-orange-100" },
  ];

  return (
    <div className="space-y-8 p-4 md:p-8">
      <WelcomeBanner name={user.name} />
      <StatsGrid stats={stats} />
      <div className="grid lg:grid-cols-2 gap-8">
        <CertificationProgress progressData={progressData} />
        <NextSteps nextAvailableTest={nextAvailableTest} />
      </div>
      <RecentActivity activityData={recentActivityData} />
    </div>
  );
}
