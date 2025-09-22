import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";

interface FloatingChatButtonProps {
  onClick: () => void;
}

export function FloatingChatButton({ onClick }: FloatingChatButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="h-14 w-14 rounded-full bg-[#003087] hover:bg-[#002266] shadow-lg"
      aria-label="Open Chat"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </Button>
  );
}
