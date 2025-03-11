'use server';

export async function speak(formData: FormData): Promise<ArrayBuffer | null> {
    const text = formData.get('text') as string;

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

        // Use bytes endpoint which returns a complete audio file
        const audioBuffer = await cartesia.tts.bytes({
            modelId: "sonic-2",
            transcript: text,
            voice: {
                mode: "id",
                id: "a0e99841-438c-4a64-b679-ae501e7d6091",
            },
            language: "en",
            outputFormat: {
                container: "wav", // Use WAV format instead of raw
                sampleRate: 44100,
                encoding: "pcm_f32le",
            },
        });

        return audioBuffer;
    } catch (error) {
        console.error("Error during TTS:", error);
        return null;
    }
}
