import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface SubmitDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  totalAnswered: number;
  totalQuestions: number;
}

const SubmitDialog = ({ isOpen, onOpenChange, onConfirm, totalAnswered, totalQuestions }: SubmitDialogProps) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Submit Test Confirmation</DialogTitle>
        <DialogDescription>
          You have answered {totalAnswered} of {totalQuestions} questions. Are you sure you want to submit?
        </DialogDescription>
      </DialogHeader>
      {totalAnswered < totalQuestions && (
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-yellow-800 text-sm">
          Warning: {totalQuestions - totalAnswered} unanswered questions will be marked incorrect.
        </div>
      )}
      <DialogFooter className="mt-4">
        <Button variant="outline" onClick={() => onOpenChange(false)}>Continue Test</Button>
        <Button onClick={onConfirm} className="bg-red-600 hover:bg-red-700">Submit Now</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default SubmitDialog;