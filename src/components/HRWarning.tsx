import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";

interface HRWarningProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function HRWarning({ open, onConfirm, onCancel }: HRWarningProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="border-red-500 border-2">
        <AlertDialogHeader>
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            <AlertDialogTitle className="text-red-600 text-2xl flex items-center gap-2">
              ⚠️ HR WARNING
            </AlertDialogTitle>
          </motion.div>
          <AlertDialogDescription className="text-base">
            <p className="mb-2 font-bold">This reply may violate company policy!</p>
            <p className="mb-2">
              The AI has detected MAXIMUM SASS levels. Sending this email could result in:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Awkward conversations with HR</li>
              <li>Mandatory "professionalism" training</li>
              <li>Being known as "that person"</li>
              <li>Legendary office status (but at what cost?)</li>
            </ul>
            <p className="mt-3 font-bold text-red-600">Proceed anyway?</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            Nevermind, I value my job
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            YOLO - Generate It
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
