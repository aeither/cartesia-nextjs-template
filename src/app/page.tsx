"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { speak } from "./actions";

export default function Home() {
	const [isPlaying, setIsPlaying] = useState<boolean>(false);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsPlaying(true);
		
		try {
			const formData = new FormData(event.currentTarget);
			const audioData = await speak(formData);
			
			if (audioData) {
				playAudio(audioData);
			} else {
				setIsPlaying(false);
			}
		} catch (error) {
			console.error("Error during TTS or playback:", error);
			setIsPlaying(false);
		}
	};

	const playAudio = (audioData: ArrayBuffer) => {
		const audioContext = new (window.AudioContext || window.AudioContext)();

		audioContext.decodeAudioData(
			audioData,
			(buffer) => {
				const source = audioContext.createBufferSource();
				source.buffer = buffer;
				source.connect(audioContext.destination);
				source.start(0);

				source.onended = () => {
					setIsPlaying(false);
				};
			},
			(error) => {
				console.error("Error decoding audio data:", error);
				setIsPlaying(false);
			}
		);
	};

	return (
		<div>
			<h1>Cartesia TTS Example</h1>
			<form onSubmit={handleSubmit}>
				<input type="text" id="text" name="text" required />
				<button type="submit" disabled={isPlaying}>
					{isPlaying ? "Speaking..." : "Speak"}
				</button>
			</form>
		</div>
	);
}
