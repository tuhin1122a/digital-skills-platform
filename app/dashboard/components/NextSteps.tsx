import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Target, Play, CheckCircle, Trophy, Clock } from "lucide-react";
import { ProgressItem } from "./types"; 

const NextSteps = ({ nextAvailableTest }: { nextAvailableTest?: ProgressItem }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <Target className="h-5 w-5 text-blue-600" />
        <span>Next Steps</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      {nextAvailableTest ? (
        <div className="text-center space-y-4">
          <div className="p-6 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              Level {nextAvailableTest.level} Assessment
            </h3>
            <p className="text-blue-700 mb-4">
              You're ready to take your next certification test!
            </p>
            <Link href="/dashboard/test">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Play className="h-4 w-4 mr-2" />
                Start Test
              </Button>
            </Link>
          </div>
          <div className="space-y-3 text-left">
             <div className="flex justify-between text-sm">
               <span>Test Duration:</span>
               <span className="font-medium">45 minutes</span>
             </div>
             <div className="flex justify-between text-sm">
               <span>Questions:</span>
               <span className="font-medium">22 questions</span>
             </div>
             <div className="flex justify-between text-sm">
               <span>Passing Score:</span>
               <span className="font-medium">25%</span>
             </div>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <div className="p-6 bg-green-50 rounded-lg">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-900 mb-2">
              All Tests Completed!
            </h3>
            <p className="text-green-700">
              Congratulations on completing all available assessments.
            </p>
          </div>
        </div>
      )}
      <div className="border-t pt-4">
        <h4 className="font-semibold mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <Link href="/dashboard/certificates">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Trophy className="h-4 w-4 mr-2" /> View Certificates
            </Button>
          </Link>
          <Link href="/dashboard/test">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Clock className="h-4 w-4 mr-2" /> Test Starts
            </Button>
          </Link>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default NextSteps;
