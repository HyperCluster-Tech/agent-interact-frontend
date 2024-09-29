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
          Our comprehensive course on Agentic AI will teach you how to build
          sophisticated AI systems like the one you just interacted with.
        </p>
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Maybe Later
          </Button>
          <Button type="button" onClick={handleClose} asChild>
            <a href="/faq">Learn More</a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
