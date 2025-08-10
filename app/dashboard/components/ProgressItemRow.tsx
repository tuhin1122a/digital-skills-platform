import { Badge } from "@/components/ui/badge";
import { CheckCircle, Play, Lock } from "lucide-react";
import { ProgressItem } from "./types";

const ProgressItemRow = ({ item }: { item: ProgressItem }) => {
  const statusConfig = {
    completed: {
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      bgColor: "bg-green-100",
      text: `Score: ${Math.round(item.score ?? 0)}%`,
      badgeVariant: "default" as const,
      badgeText: "Completed",
    },
    available: {
      icon: <Play className="h-5 w-5 text-blue-600" />,
      bgColor: "bg-blue-100",
      text: "Ready to start",
      badgeVariant: "secondary" as const,
      badgeText: "Available",
    },
    locked: {
      icon: <Lock className="h-5 w-5 text-gray-400" />,
      bgColor: "bg-gray-100",
      text: "Locked",
      badgeVariant: "outline" as const,
      badgeText: "Locked",
    },
  };

  const config = statusConfig[item.status];

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border">
      <div className="flex items-center space-x-4">
        <div className={`p-2 rounded-full ${config.bgColor}`}>{config.icon}</div>
        <div>
          <h3 className="font-semibold">Level {item.level}</h3>
          <p className="text-sm text-gray-600">{config.text}</p>
        </div>
      </div>
      <Badge variant={config.badgeVariant}>{config.badgeText}</Badge>
    </div>
  );
};

export default ProgressItemRow;
