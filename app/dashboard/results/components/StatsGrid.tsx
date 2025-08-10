import { Trophy, Clock, Target, CheckCircle } from "lucide-react";
import { TestResult } from "../../components/types";
import StatCard from "./StatCard";


interface StatsGridProps {
  results: TestResult;
}

const StatsGrid = ({ results }: StatsGridProps) => {
  const stats = [
    {
      icon: Target,
      value: `${results.correctAnswers}/${results.totalQuestions}`,
      label: "Correct Answers",
      color: "text-blue-600",
    },
    {
      icon: Clock,
      value: results.timeSpent ?? "N/A",
      label: "Time Spent",
      color: "text-green-600",
    },
    {
      icon: Trophy,
      value: `${results.passingScore}%`,
      label: "Passing Score",
      color: "text-yellow-600",
    },
    {
      icon: CheckCircle,
      value: `Level ${results.level}`,
      label: "Achieved",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};

export default StatsGrid;
