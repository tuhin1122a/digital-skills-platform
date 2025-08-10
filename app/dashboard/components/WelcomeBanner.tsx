import { TrendingUp } from "lucide-react";

const WelcomeBanner = ({ name }: { name: string }) => (
  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-8 text-white">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {name}!</h1>
        <p className="text-blue-100 text-lg">
          Ready to continue your digital certification journey?
        </p>
      </div>
      <div className="hidden md:block">
        <TrendingUp className="h-16 w-16 text-blue-200" />
      </div>
    </div>
  </div>
);

export default WelcomeBanner;