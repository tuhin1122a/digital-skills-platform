// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import {
//   Trophy,
//   Clock,
//   Target,
//   TrendingUp,
//   Play,
//   CheckCircle,
//   Lock,
// } from "lucide-react"
// import Link from "next/link"
// import { auth } from "@/auth"
// import { fetchUserProgress } from "@/lib/fetchUserProgressData"
// import { fetchRecentActivity } from "@/lib/fetchRecentActivity"

// interface ProgressItem {
//   level: string
//   status: "completed" | "available" | "locked"
//   score: number | null
//   unlocked: boolean
// }

// const levelOrder = ["A1", "A2", "B1", "B2", "C1", "C2"]

// function getCurrentLevel(progressData: ProgressItem[]): string {
//   const availableLevels = progressData
//     .filter((item) => item.status === "available")
//     .map((item) => item.level)

//   if (availableLevels.length > 0) {
//     let minIndex = levelOrder.length
//     availableLevels.forEach((lvl) => {
//       const idx = levelOrder.indexOf(lvl)
//       if (idx >= 0 && idx < minIndex) minIndex = idx
//     })
//     return levelOrder[minIndex]
//   }

//   const completedLevels = progressData
//     .filter((item) => item.status === "completed")
//     .map((item) => item.level)

//   if (completedLevels.length > 0) {
//     let maxIndex = -1
//     completedLevels.forEach((lvl) => {
//       const idx = levelOrder.indexOf(lvl)
//       if (idx > maxIndex) maxIndex = idx
//     })
//     return maxIndex >= 0 ? levelOrder[maxIndex] : "N/A"
//   }

//   return "N/A"
// }

// export default async function DashboardPage() {
//   const session = await auth()

//   if (!session?.user) {
//     return <p className="p-8 text-center">Please login to see your dashboard.</p>
//   }

//   const user = session.user as { id: string; name: string; accessToken: string }

//   const progressData: ProgressItem[] = await fetchUserProgress(
//     user.id,
//     user.accessToken
//   )
//   const recentActivityData = await fetchRecentActivity(user.id, user.accessToken)

//   // completed status এর items
//   const completedTests = progressData.filter((item) => item.status === "completed")
//   const testsCompletedCount = completedTests.length

//   // currentLevel
//   const currentLevel = getCurrentLevel(progressData)

//   // Average Score
//   const averageScore =
//     testsCompletedCount > 0
//       ? Math.round(
//           completedTests.reduce((acc, cur) => acc + (cur.score ?? 0), 0) /
//             testsCompletedCount
//         ) + "%"
//       : "0%"

//   // Time Spent (45 মিনিট * testsCompletedCount থেকে হিসাব)
//   const totalMinutes = testsCompletedCount * 45
//   const hours = Math.floor(totalMinutes / 60)
//   const minutes = totalMinutes % 60
//   const timeSpent = `${hours}h${minutes > 0 ? " " + minutes + "m" : ""}`

//   // Next available test
//   const nextAvailableTest = progressData.find(
//     (item) => item.status === "available"
//   )

//   const stats = [
//     {
//       title: "Tests Completed",
//       value: testsCompletedCount.toString(),
//       icon: CheckCircle,
//       color: "text-green-600",
//       bgColor: "bg-green-100",
//     },
//     {
//       title: "Current Level",
//       value: currentLevel,
//       icon: Trophy,
//       color: "text-blue-600",
//       bgColor: "bg-blue-100",
//     },
//     {
//       title: "Average Score",
//       value: averageScore,
//       icon: Target,
//       color: "text-purple-600",
//       bgColor: "bg-purple-100",
//     },
//     {
//       title: "Time Spent",
//       value: timeSpent,
//       icon: Clock,
//       color: "text-orange-600",
//       bgColor: "bg-orange-100",
//     },
//   ]

//   return (
//     <div className="space-y-8">
//       {/* Welcome Section */}
//       <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-8 text-white">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
//             <p className="text-blue-100 text-lg">
//               Ready to continue your digital certification journey?
//             </p>
//           </div>
//           <div className="hidden md:block">
//             <TrendingUp className="h-16 w-16 text-blue-200" />
//           </div>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <Card key={index}>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
//                     {stat.title}
//                   </p>
//                   <p className="text-2xl font-bold text-gray-900 dark:text-white">
//                     {stat.value}
//                   </p>
//                 </div>
//                 <div className={`p-3 rounded-full ${stat.bgColor}`}>
//                   <stat.icon className={`h-6 w-6 ${stat.color}`} />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Progress Overview & Next Steps */}
//       <div className="grid lg:grid-cols-2 gap-8">
//         {/* Certification Progress */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <Trophy className="h-5 w-5 text-yellow-600" />
//               <span>Certification Progress</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {progressData.map((item) => (
//               <div
//                 key={item.level}
//                 className="flex items-center justify-between p-4 rounded-lg border"
//               >
//                 <div className="flex items-center space-x-4">
//                   <div
//                     className={`p-2 rounded-full ${
//                       item.status === "completed"
//                         ? "bg-green-100"
//                         : item.status === "available"
//                         ? "bg-blue-100"
//                         : "bg-gray-100"
//                     }`}
//                   >
//                     {item.status === "completed" ? (
//                       <CheckCircle className="h-5 w-5 text-green-600" />
//                     ) : item.status === "available" ? (
//                       <Play className="h-5 w-5 text-blue-600" />
//                     ) : (
//                       <Lock className="h-5 w-5 text-gray-400" />
//                     )}
//                   </div>
//                   <div>
//                     <h3 className="font-semibold">Level {item.level}</h3>
//                     <p className="text-sm text-gray-600">
//                       {item.status === "completed"
//                         ? `Score: ${Math.round(item.score ?? 0)}%`
//                         : item.status === "available"
//                         ? "Ready to start"
//                         : "Locked"}
//                     </p>
//                   </div>
//                 </div>
//                 <Badge
//                   variant={
//                     item.status === "completed"
//                       ? "default"
//                       : item.status === "available"
//                       ? "secondary"
//                       : "outline"
//                   }
//                 >
//                   {item.status === "completed"
//                     ? "Completed"
//                     : item.status === "available"
//                     ? "Available"
//                     : "Locked"}
//                 </Badge>
//               </div>
//             ))}
//           </CardContent>
//         </Card>

//         {/* Next Steps */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <Target className="h-5 w-5 text-blue-600" />
//               <span>Next Steps</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {nextAvailableTest ? (
//               <div className="text-center space-y-4">
//                 <div className="p-6 bg-blue-50 rounded-lg">
//                   <h3 className="text-xl font-bold text-blue-900 mb-2">
//                     Level {nextAvailableTest.level} Assessment
//                   </h3>
//                   <p className="text-blue-700 mb-4">
//                     You're ready to take your next certification test!
//                   </p>
//                   <Link href="/dashboard/test">
//                     <Button className="bg-blue-600 hover:bg-blue-700">
//                       <Play className="h-4 w-4 mr-2" />
//                       Start Test
//                     </Button>
//                   </Link>
//                 </div>

//                 <div className="space-y-3">
//                   <div className="flex justify-between text-sm">
//                     <span>Test Duration:</span>
//                     <span className="font-medium">45 minutes</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span>Questions:</span>
//                     <span className="font-medium">44 questions</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span>Passing Score:</span>
//                     <span className="font-medium">70%</span>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="text-center space-y-4">
//                 <div className="p-6 bg-green-50 rounded-lg">
//                   <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
//                   <h3 className="text-xl font-bold text-green-900 mb-2">
//                     All Tests Completed!
//                   </h3>
//                   <p className="text-green-700">
//                     Congratulations on completing all available assessments.
//                   </p>
//                 </div>
//               </div>
//             )}

//             <div className="border-t pt-4">
//               <h4 className="font-semibold mb-3">Quick Actions</h4>
//               <div className="space-y-2">
//                 <Link href="/dashboard/certificates">
//                   <Button variant="outline" className="w-full justify-start bg-transparent">
//                     <Trophy className="h-4 w-4 mr-2" />
//                     View Certificates
//                   </Button>
//                 </Link>
//                 <Link href="/dashboard/tests">
//                   <Button variant="outline" className="w-full justify-start bg-transparent">
//                     <Clock className="h-4 w-4 mr-2" />
//                     Test History
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Activity */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Activity</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {recentActivityData.slice(0, 5).map((item: any, idx: number) => {
//               if (item.type === "assessment_completed") {
//                 const certified = (item.score ?? 0) >= 25
//                 return (
//                   <div
//                     key={idx}
//                     className={`flex items-center space-x-4 p-4 rounded-lg ${
//                       certified ? "bg-green-50" : "bg-red-50"
//                     }`}
//                   >
//                     <CheckCircle
//                       className={`h-8 w-8 ${
//                         certified ? "text-green-600" : "text-red-600"
//                       }`}
//                     />
//                     <div className="flex-1">
//                       <p className="font-medium">{item.description}</p>
//                       <p className="text-sm text-gray-600">
//                         Score: {item.score}% • {new Date(item.date).toLocaleDateString()}
//                       </p>
//                     </div>
//                     <Badge variant={certified ? "default" : "destructive"}>
//                       {certified ? "Certified" : "Failed"}
//                     </Badge>
//                   </div>
//                 )
//               } else if (item.type === "certificate_issued") {
//                 return (
//                   <div
//                     key={idx}
//                     className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg"
//                   >
//                     <Trophy className="h-8 w-8 text-blue-600" />
//                     <div className="flex-1">
//                       <p className="font-medium">{item.description}</p>
//                       <p className="text-sm text-gray-600">
//                         Digital Skills Level {item.level} • {new Date(item.date).toLocaleDateString()}
//                       </p>
//                     </div>
//                     <Button variant="outline" size="sm" disabled={!item.certificateUrl} asChild={!!item.certificateUrl}>
//                       {item.certificateUrl ? (
//                         <Link href={item.certificateUrl} target="_blank" rel="noopener noreferrer">
//                           Download
//                         </Link>
//                       ) : (
//                         "No File"
//                       )}
//                     </Button>
//                   </div>
//                 )
//               }
//               return null
//             })}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
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
