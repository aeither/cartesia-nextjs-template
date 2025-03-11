"use client";

import { LANGUAGES } from "../constants";

interface LanguageSelectorProps {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  disabled: boolean;
}

export default function LanguageSelector({
  selectedLanguage,
  setSelectedLanguage,
  disabled,
}: LanguageSelectorProps) {
  return (
    <div>
      <label
        htmlFor="language"
        className="block text-sm font-medium mb-1"
      >
        Language
      </label>
      <select
        id="language"
        name="language"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="w-full p-2 border rounded"
        disabled={disabled}
      >
        {LANGUAGES.map((language) => (
          <option key={language.id} value={language.id}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
}
