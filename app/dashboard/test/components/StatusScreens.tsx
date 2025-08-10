import { Card, CardContent } from "@/components/ui/card";

export const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div>Loading questions...</div>
  </div>
);

export const NoQuestionsScreen = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div>No questions available for your level.</div>
  </div>
);

export const SubmittingScreen = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <Card className="w-full max-w-md">
      <CardContent className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-bold mb-2">Submitting Your Test...</h2>
        <p className="text-gray-600">Please wait while we process your answers.</p>
      </CardContent>
    </Card>
  </div>
);
