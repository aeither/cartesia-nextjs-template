"use client";

import { MODELS } from "../constants";

interface ModelSelectorProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  disabled: boolean;
}

export default function ModelSelector({
  selectedModel,
  setSelectedModel,
  disabled,
}: ModelSelectorProps) {
  return (
    <div className="bg-white p-3 rounded border border-blue-200 shadow-sm">
      <label htmlFor="model" className="block text-sm font-medium mb-2 text-gray-700">
        Voice Model
      </label>
      <select
        id="model"
        name="model"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        className="w-full p-2 border rounded bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        disabled={disabled}
      >
        {MODELS.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
}
