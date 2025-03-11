"use client";

interface ActionButtonsProps {
  isPlaying: boolean;
  hasAudio: boolean;
  onDownload: () => void;
}

export default function ActionButtons({
  isPlaying,
  hasAudio,
  onDownload,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-2">
      <button
        type="submit"
        disabled={isPlaying}
        className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isPlaying ? "Speaking..." : "Speak"}
      </button>
      
      {hasAudio && (
        <button
          type="button"
          onClick={onDownload}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Download
        </button>
      )}
    </div>
  );
}
