"use client";

import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { speak } from "./actions";

// Available models and languages based on Cartesia documentation
const MODELS = [
	{ id: "sonic-2", name: "Sonic 2 (Latest)" },
	{ id: "sonic-turbo", name: "Sonic Turbo (Low Latency)" },
	{ id: "sonic", name: "Sonic (Original)" },
];

const LANGUAGES = [
	{ id: "en", name: "English" },
	{ id: "fr", name: "French" },
	{ id: "de", name: "German" },
	{ id: "es", name: "Spanish" },
	{ id: "pt", name: "Portuguese" },
	{ id: "zh", name: "Chinese" },
	{ id: "ja", name: "Japanese" },
	{ id: "hi", name: "Hindi" },
	{ id: "it", name: "Italian" },
	{ id: "ko", name: "Korean" },
	{ id: "nl", name: "Dutch" },
	{ id: "pl", name: "Polish" },
	{ id: "ru", name: "Russian" },
	{ id: "sv", name: "Swedish" },
	{ id: "tr", name: "Turkish" },
];

// Formatting tips for better speech generation
const FORMATTING_TIPS = [
	{
		id: "punct",
		title: "Punctuation",
		content:
			"Use appropriate punctuation and end each sentence with punctuation.",
	},
	{
		id: "dates",
		title: "Dates",
		content: "Format dates as MM/DD/YYYY (e.g., 04/20/2023).",
	},
	{
		id: "pauses",
		title: "Pauses",
		content:
			'Insert pauses with <break time="1s" /> or <break time="500ms" />.',
	},
	{
		id: "questions",
		title: "Questions",
		content: "Use double question marks for emphasis (e.g., 'Are you here??').",
	},
	{
		id: "urls",
		title: "URLs",
		content:
			"Add a space between URLs/emails and punctuation (e.g., 'visit example.com ?').",
	},
	{
		id: "spelling",
		title: "Spelling Out",
		content:
			"Use <spell>123-456-7890</spell> to spell out numbers or identifiers.",
	},
	{
		id: "avoid",
		title: "Avoid",
		content: "Avoid using quotation marks unless referring to a quote.",
	},
];

export default function Home() {
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [selectedModel, setSelectedModel] = useState<string>("sonic-2");
	const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
	const [showTips, setShowTips] = useState<boolean>(false);
	const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
	const [audioText, setAudioText] = useState<string>("");
	const audioRef = useRef<HTMLAudioElement | null>(null);

	// Create audio element once the component loads
	useEffect(() => {
		audioRef.current = new Audio();
		audioRef.current.onended = () => setIsPlaying(false);
		
		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current = null;
			}
		};
	}, []);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsPlaying(true);
		
		try {
			const formData = new FormData(event.currentTarget);
			const text = formData.get('text') as string;
			formData.append("model", selectedModel);
			formData.append("language", selectedLanguage);
			
			const audioBuffer = await speak(formData);
			
			if (audioBuffer) {
				// Convert ArrayBuffer to Blob
				const blob = new Blob([audioBuffer], { type: 'audio/wav' });
				setAudioBlob(blob);
				setAudioText(text);
				
				// Create object URL for playback
				const url = URL.createObjectURL(blob);
				
				if (audioRef.current) {
					audioRef.current.src = url;
					audioRef.current.play().catch(error => {
						console.error("Error playing audio:", error);
						setIsPlaying(false);
					});
				}
			} else {
				setIsPlaying(false);
			}
		} catch (error) {
			console.error("Error during TTS or playback:", error);
			setIsPlaying(false);
		}
	};

	const handleDownload = () => {
		if (!audioBlob) return;
		
		// Create a safe filename from the input text
		const filename = `${audioText.substring(0, 20).replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${selectedModel}_${selectedLanguage}.wav`;
		
		// Create a download link using the blob URL
		const url = URL.createObjectURL(audioBlob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		
		// Clean up the URL object
		setTimeout(() => URL.revokeObjectURL(url), 100);
	};

	return (
		<div className="container p-4 mx-auto max-w-3xl">
			<h1 className="text-2xl font-bold mb-6">Cartesia TTS Example</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
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
							disabled={isPlaying}
						>
							{MODELS.map((model) => (
								<option key={model.id} value={model.id}>
									{model.name}
								</option>
							))}
						</select>
					</div>
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
							disabled={isPlaying}
						>
							{LANGUAGES.map((language) => (
								<option key={language.id} value={language.id}>
									{language.name}
								</option>
							))}
						</select>
					</div>
				</div>

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

					{showTips && (
						<div className="bg-blue-50 p-3 rounded mb-2 text-sm">
							<h3 className="font-medium mb-2">
								Formatting Tips for Better Results
							</h3>
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
					)}

					<textarea
						id="text"
						name="text"
						required
						rows={4}
						className="w-full p-2 border rounded"
						disabled={isPlaying}
						placeholder="Enter text to be spoken. Click 'Show Formatting Tips' for better results."
					/>
				</div>

				<div className="flex gap-2">
					<button
						type="submit"
						disabled={isPlaying}
						className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
					>
						{isPlaying ? "Speaking..." : "Speak"}
					</button>
					
					{audioBlob && (
						<button
							type="button"
							onClick={handleDownload}
							className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
						>
							Download
						</button>
					)}
				</div>
			</form>
		</div>
	);
}
