import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import ProgressItemRow from "./ProgressItemRow";
import { ProgressItem } from "./types";


const CertificationProgress = ({ progressData }: { progressData: ProgressItem[] }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <Trophy className="h-5 w-5 text-yellow-600" />
        <span>Certification Progress</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {progressData.map((item) => (
        <ProgressItemRow key={item.level} item={item} />
      ))}
    </CardContent>
  </Card>
);

export default CertificationProgress;