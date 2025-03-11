// Available models and languages based on Cartesia documentation
export const MODELS = [
	{ id: "sonic-2", name: "Sonic 2 (Latest)" },
	{ id: "sonic-turbo", name: "Sonic Turbo (Low Latency)" },
	{ id: "sonic", name: "Sonic (Original)" },
];

export const LANGUAGES = [
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
export const FORMATTING_TIPS = [
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
