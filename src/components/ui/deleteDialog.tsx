import { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alertDialog";
import { Button } from "./button";

interface IProps {
  visible: boolean;
  message: string;
  setVisible: (value: boolean) => void;
}

export const DeleteDialog = ({ visible, message, setVisible }: IProps) => {
  useEffect(() => {
    if (visible) {
      document.getElementById("btn-trigger")?.click();
    }
  }, [visible]);

  const closeDialog = () => {
    setVisible(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="hidden" id="btn-trigger"></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{message}</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeDialog}>Tidak</AlertDialogCancel>
          <AlertDialogAction onClick={closeDialog}>Ya</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
