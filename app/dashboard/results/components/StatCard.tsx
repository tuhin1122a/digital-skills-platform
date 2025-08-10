import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  color: string;
}

const StatCard = ({ icon: Icon, value, label, color }: StatCardProps) => (
  <Card>
    <CardContent className="p-6 text-center">
      <Icon className={`h-8 w-8 ${color} mx-auto mb-2`} />
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </CardContent>
  </Card>
);

export default StatCard;