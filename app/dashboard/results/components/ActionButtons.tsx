import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";

interface ActionButtonsProps {
  passed: boolean;
}

const ActionButtons = ({ passed }: ActionButtonsProps) => (
  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    {passed && (
      <Link href="/test">
        <Button className="bg-blue-600 hover:bg-blue-700">
          Proceed to Next Step
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </Link>
    )}
    <Link href="/certificate">
      <Button variant="outline">
        <Download className="h-4 w-4 mr-2" />
        Download Certificate
      </Button>
    </Link>
  </div>
);

export default ActionButtons;