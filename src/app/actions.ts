'use server';

// Define supported languages based on Cartesia documentation
type SupportedLanguage =
    | 'en' | 'fr' | 'de' | 'es' | 'pt'
    | 'zh' | 'ja' | 'hi' | 'it' | 'ko'
    | 'nl' | 'pl' | 'ru' | 'sv' | 'tr';

export async function speak(formData: FormData): Promise<ArrayBuffer | null> {
    const text = formData.get('text') as string;
    const model = formData.get('model') as string || 'sonic-2';
    const language = formData.get('language') as SupportedLanguage || 'en';
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
            modelId: model,
            transcript: text,
            voice: {
                mode: "id",
                id: "a0e99841-438c-4a64-b679-ae501e7d6091",
                experimentalControls: {
                    emotion: ["curiosity:highest"],
                    speed: "normal",
                }
            },
            language: language,
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
