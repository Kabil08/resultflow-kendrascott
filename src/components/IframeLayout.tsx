import { useState, useEffect } from "react";
import { FloatingChatButton } from "./FloatingChatButton";
import { ChatDialog } from "./ChatDialog";
import { IframeFallback } from "./IframeFallback";

export function IframeLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    // Check if the iframe loads successfully
    const checkIframeLoad = async () => {
      try {
        const response = await fetch("/kendra-scott");
        if (!response.ok) {
          setIframeError(true);
        }
      } catch {
        setIframeError(true);
      }
    };
    checkIframeLoad();
  }, []);

  if (iframeError) {
    return (
      <>
        <IframeFallback />
        <div className="fixed right-4 bottom-4 z-50">
          <FloatingChatButton onClick={() => setIsChatOpen(true)} />
          <ChatDialog
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
          />
        </div>
      </>
    );
  }

  return (
    <div className="relative w-full h-screen">
      {/* Main iframe */}
      <iframe
        src="/kendra-scott"
        className="w-full h-full border-none"
        title="Kendra Scott Website"
        sandbox="allow-same-origin allow-scripts allow-forms"
        onError={() => setIframeError(true)}
      />

      {/* Chat components */}
      <div className="fixed right-4 bottom-4 z-50">
        <FloatingChatButton onClick={() => setIsChatOpen(true)} />
        <ChatDialog isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </div>
  );
}
