import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

export function CoursePopup({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Unlock Your AI Potential!</DialogTitle>
          <DialogDescription>
            You've just experienced a taste of what AI can do. Imagine creating
            your own intelligent agents!
          </DialogDescription>
        </DialogHeader>
        <p className="py-4">
          Our comprehensive course on Retrieval Augmented Generation (RAG) and
          Agentic AI systems will teach you how to build sophisticated AI
          systems like the one you just interacted with.
        </p>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            onClick={handleClose}
            variant="secondary"
            asChild
          >
            <Link href="/faq">Learn More</Link>
          </Button>
          <Button type="button" onClick={handleClose} asChild>
            <Link href="https://pesu.io/courses/">Enroll Now!</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
