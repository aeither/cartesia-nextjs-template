"use client";

import { SPEEDS } from "../constants";

interface SpeedSelectorProps {
  selectedSpeed: string;
  setSelectedSpeed: (speed: string) => void;
  disabled: boolean;
}

export default function SpeedSelector({
  selectedSpeed,
  setSelectedSpeed,
  disabled,
}: SpeedSelectorProps) {
  return (
    <div className="bg-white p-3 rounded border border-blue-200 shadow-sm">
      <label htmlFor="speed" className="block text-sm font-medium mb-2 text-gray-700">
        Speaking Speed
      </label>
      <select
        id="speed"
        name="speed"
        value={selectedSpeed}
        onChange={(e) => setSelectedSpeed(e.target.value)}
        className="w-full p-2 border rounded bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        disabled={disabled}
      >
        {SPEEDS.map((speed) => (
          <option key={speed.id} value={speed.id}>
            {speed.name}
          </option>
        ))}
      </select>
    </div>
  );
}
