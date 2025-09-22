export function IframeFallback() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground p-4">
      <h1 className="text-2xl font-bold mb-4">
        Unable to Load Kendra Scott Website
      </h1>
      <p className="text-center mb-4">
        The website cannot be displayed in an iframe due to security
        restrictions.
      </p>
      <p className="text-center mb-4">You can visit the website directly at:</p>
      <a
        href="https://www.kendrascott.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        www.kendrascott.com
      </a>
    </div>
  );
}
