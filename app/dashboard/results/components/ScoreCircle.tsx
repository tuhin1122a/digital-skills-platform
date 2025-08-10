interface ScoreCircleProps {
    score: number;
    passed: boolean;
  }
  
  const ScoreCircle = ({ score, passed }: ScoreCircleProps) => {
    const circumference = 2 * Math.PI * 56; // 2 * pi * r
    const offset = circumference * (1 - score / 100);
  
    return (
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-gray-200" />
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={passed ? "text-green-500" : "text-red-500"}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-gray-900">{score}%</span>
        </div>
      </div>
    );
  };
  
  export default ScoreCircle;