import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { RecentActivityItem } from "./types";
import ActivityItem from "./ActivityItem";

const RecentActivity = ({ activityData }: { activityData: RecentActivityItem[] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Activity</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {activityData.slice(0, 5).map((item, idx) => (
          <ActivityItem key={idx} item={item} />
        ))}
      </div>
    </CardContent>
  </Card>
);

export default RecentActivity;