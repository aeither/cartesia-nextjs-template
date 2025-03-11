"use client";

interface TextInputProps {
  showTips: boolean;
  setShowTips: (show: boolean) => void;
  disabled: boolean;
}

export default function TextInput({ 
  showTips, 
  setShowTips, 
  disabled 
}: TextInputProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label htmlFor="text" className="block text-sm font-medium">
          Text to Speak
        </label>
        <button
          type="button"
          onClick={() => setShowTips(!showTips)}
          className="text-sm text-blue-500 hover:text-blue-700"
        >
          {showTips ? "Hide Tips" : "Show Formatting Tips"}
        </button>
      </div>

      <textarea
        id="text"
        name="text"
        required
        rows={4}
        className="w-full p-2 border rounded"
        disabled={disabled}
        placeholder="Enter text to be spoken. Click 'Show Formatting Tips' for better results."
      />
    </div>
  );
}
