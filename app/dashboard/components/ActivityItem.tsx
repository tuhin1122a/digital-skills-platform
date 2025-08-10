import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CheckCircle, Trophy } from "lucide-react";
import { RecentActivityItem } from "./types";

const ActivityItem = ({ item }: { item: RecentActivityItem }) => {
  if (item.type === "assessment_completed") {
    // স্কোর ২৫% বা তার বেশি হলে Certified, না হলে Failed
    const isCertified = (item.score ?? 0) >= 25;
    return (
      <div className={`flex items-center space-x-4 p-4 rounded-lg ${isCertified ? "bg-green-50" : "bg-red-50"}`}>
        <CheckCircle className={`h-8 w-8 ${isCertified ? "text-green-600" : "text-red-600"}`} />
        <div className="flex-1">
          <p className="font-medium">{item.description}</p>
          <p className="text-sm text-gray-600">
            Score: {item.score}% • {new Date(item.date).toLocaleDateString()}
          </p>
        </div>
        <Badge variant={isCertified ? "default" : "destructive"}>
          {isCertified ? "Certified" : "Failed"}
        </Badge>
      </div>
    );
  }

  if (item.type === "certificate_issued") {
    return (
      <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
        <Trophy className="h-8 w-8 text-blue-600" />
        <div className="flex-1">
          <p className="font-medium">{item.description}</p>
          <p className="text-sm text-gray-600">
            Digital Skills Level {item.level} • {new Date(item.date).toLocaleDateString()}
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={item.certificateUrl || "#"} target="_blank" rel="noopener noreferrer">
            Download
          </Link>
        </Button>
      </div>
    );
  }

  return null;
};

export default ActivityItem;
