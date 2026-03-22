export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        {/* Simple Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-800 border-t-blue-500" />

        {/* Optional Simple Text */}
        <p className="font-mono text-sm text-gray-400 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
