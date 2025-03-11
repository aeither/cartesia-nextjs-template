"use client";

import { FORMATTING_TIPS } from "../constants";

interface FormattingTipsProps {
  showTips: boolean;
}

export default function FormattingTips({ showTips }: FormattingTipsProps) {
  if (!showTips) return null;

  return (
    <div className="bg-blue-50 p-3 rounded mb-2 text-sm">
      <h3 className="font-medium mb-2">Formatting Tips for Better Results</h3>
      <ul className="space-y-1 list-disc pl-5">
        {FORMATTING_TIPS.map((tip) => (
          <li key={tip.id}>
            <span className="font-medium">{tip.title}:</span>{" "}
            {tip.content}
          </li>
        ))}
      </ul>
      <div className="mt-2">
        <h4 className="font-medium">Example:</h4>
        <code className="block bg-gray-100 p-2 rounded mt-1 text-xs">
          Hello, my name is Sonic.&lt;break time="1s"/&gt;Nice to meet
          you.
          <br />
          Phone number: &lt;spell&gt;123-456-7890&lt;/spell&gt;
        </code>
      </div>
    </div>
  );
}
