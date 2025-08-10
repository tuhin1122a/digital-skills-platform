
import StatCard from "./StatCard";
import { Stat } from "./types";

const StatsGrid = ({ stats }: { stats: Stat[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {stats.map((stat) => (
      <StatCard key={stat.title} {...stat} />
    ))}
  </div>
);

export default StatsGrid;