"use client";

import type { WebPlayer } from "@cartesia/cartesia-js/wrapper/WebPlayer";
import { useEffect, useState } from "react";
import { speak } from "./actions";

export default function Home() {
	const [player, setPlayer] = useState<WebPlayer | null>(null);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [audioData, setAudioData] = useState<ArrayBuffer | null>(null);

	useEffect(() => {
		// Dynamically import WebPlayer only in the browser
		if (typeof window !== "undefined") {
			import("@cartesia/cartesia-js")
				.then(({ WebPlayer }) => {
					setPlayer(new WebPlayer({ bufferDuration: 1 }));
				})
				.catch((error) => {
					console.error("Error initializing WebPlayer:", error);
				});
		}
	}, []);

	const handleSpeak = async (formData: FormData) => {
		setIsPlaying(true);
		try {
			const audioData = await speak(formData);
			if (audioData) {
				const audioContext = new (
					window.AudioContext || window.webkitAudioContext
				)();

				// Decode the complete audio file
				audioContext.decodeAudioData(
					audioData,
					(buffer) => {
						// Create a source node
						const source = audioContext.createBufferSource();
						source.buffer = buffer;
						source.connect(audioContext.destination);
						source.start(0);

						// Set isPlaying to false when playback ends
						source.onended = () => {
							setIsPlaying(false);
						};
					},
					(error) => {
						console.error("Error decoding audio data:", error);
						setIsPlaying(false);
					},
				);
			} else {
				setIsPlaying(false);
			}
		} catch (error) {
			console.error("Error during TTS or playback:", error);
			setIsPlaying(false);
		}
	};

	return (
		<div>
			<h1>Cartesia TTS Example</h1>
			<form action={handleSpeak}>
				<input type="text" id="text" name="text" required />
				<button type="submit" disabled={isPlaying}>
					{isPlaying ? "Speaking..." : "Speak"}
				</button>
			</form>
		</div>
	);
}
