'use server';

export async function speak(formData: FormData): Promise<ArrayBuffer | null> {
    const text = formData.get('text') as string;
    const apiKey = process.env.CARTESIA_API_KEY;

    if (!text) {
        console.error("No text provided.");
        return null;
    }

    if (!apiKey) {
        console.error("Cartesia API key not found in environment variables.");
        return null;
    }

    try {
        const { CartesiaClient } = await import("@cartesia/cartesia-js");
        const cartesia = new CartesiaClient({ apiKey });

        return await cartesia.tts.bytes({
            modelId: "sonic-2",
            transcript: text,
            voice: {
                mode: "id",
                id: "a0e99841-438c-4a64-b679-ae501e7d6091",
            },
            language: "en",
            outputFormat: {
                container: "wav",
                sampleRate: 44100,
                encoding: "pcm_f32le",
            },
        });
    } catch (error) {
        console.error("Error during TTS:", error);
        return null;
    }
}
