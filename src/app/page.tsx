"use client";

import { WebPlayer } from "@cartesia/cartesia-js";
import React, { useEffect, useState } from "react";

async function speak(formData: FormData): Promise<string | null> {
	"use server";

	const text = formData.get("text") as string;

	if (!text) {
		console.error("No text provided.");
		return null;
	}

	const apiKey = process.env.CARTESIA_API_KEY;

	if (!apiKey) {
		console.error("Cartesia API key not found in environment variables.");
		return null;
	}

	try {
		const { CartesiaClient } = await import("@cartesia/cartesia-js");
		const cartesia = new CartesiaClient({ apiKey });
		const websocket = cartesia.tts.websocket({
			container: "raw",
			encoding: "pcm_f32le",
			sampleRate: 44100,
		});

		await websocket.connect();

		const response = await websocket.send({
			modelId: "sonic-2",
			voice: {
				mode: "id",
				id: "a0e99841-438c-4a64-b679-ae501e7d6091",
			},
			transcript: text,
		});

		const chunks: Uint8Array[] = [];
		for await (const message of response.events("message")) {
			chunks.push(message);
		}

		const blob = new Blob(chunks, { type: "audio/raw" });
		return URL.createObjectURL(blob);
	} catch (error) {
		console.error("Error during TTS:", error);
		return null;
	}
}

export default function Home() {
	const [player, setPlayer] = useState<WebPlayer | null>(null);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [audioSource, setAudioSource] = useState<string | null>(null);

	useEffect(() => {
		setPlayer(new WebPlayer());
	}, []);

	useEffect(() => {
		return () => {
			if (audioSource) {
				URL.revokeObjectURL(audioSource);
			}
		};
	}, [audioSource]);

	const handleSpeak = async (formData: FormData) => {
		setIsPlaying(true);
		try {
			const newAudioSource = await speak(formData);
			if (newAudioSource) {
				setAudioSource(newAudioSource);
				if (player) {
					const audioElement = new Audio(newAudioSource);
					await player.play(audioElement);
				}
			}
		} catch (error) {
			console.error("Error during TTS or playback:", error);
		} finally {
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
