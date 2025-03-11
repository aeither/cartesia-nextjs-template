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
    <div>
      <label htmlFor="model" className="block text-sm font-medium mb-1">
        Model
      </label>
      <select
        id="model"
        name="model"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        className="w-full p-2 border rounded"
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
