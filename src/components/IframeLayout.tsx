import { useState, useEffect } from "react";
import { FloatingChatButton } from "./FloatingChatButton";
import { ChatDialog } from "./ChatDialog";
import { IframeFallback } from "./IframeFallback";

export function IframeLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  // The URL to load in the iframe
  const iframeUrl = import.meta.env.DEV
    ? "/proxy" // Use proxy in development
    : "https://www.kendrascott.com"; // Direct URL in production

  useEffect(() => {
    // Check if we're in production and show error immediately
    if (!import.meta.env.DEV) {
      setIframeError(true);
    }
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Show fallback or iframe based on error state */}
      {iframeError ? (
        <IframeFallback />
      ) : (
        <iframe
          src={iframeUrl}
          className="w-full h-full border-none"
          title="Kendra Scott Website"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          onError={() => setIframeError(true)}
        />
      )}

      {/* Chat components */}
      <div className="fixed right-4 bottom-4 z-50">
        <div className="flex flex-col items-end gap-2">
          <div className="text-xs text-gray-600 bg-white/80 px-2 py-1 rounded-md shadow-sm">
            Powered by ResultFlow.ai
          </div>
          <FloatingChatButton onClick={() => setIsChatOpen(true)} />
          <ChatDialog
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}
