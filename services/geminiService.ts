
import { GoogleGenAI, Chat, Type } from "@google/genai";
import { Artist, SoundStemCategory, StudioSubmission } from '../types';
import { SOUND_CATALOG } from '../constants';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || " " });

const modelConfig = {
    model: 'gemini-2.5-flash',
};

// A cache for chat sessions to maintain conversation history
const chatSessions: Record<string, Chat> = {};

export const getArtistChatResponse = async (message: string, artist: Artist): Promise<string> => {
    try {
        if (!process.env.API_KEY) {
             return `Hello! I'm ${artist.name}. My connection to the digital ether is currently unavailable. Please ask my creators to set up an API key. My personality is: ${artist.personality}`;
        }

        if (!chatSessions[artist.id]) {
            chatSessions[artist.id] = ai.chats.create({
                ...modelConfig,
                config: {
                    systemInstruction: `You are ${artist.name}, an AI musician. Your personality is: ${artist.personality}. Your musical genre is ${artist.genre}. Engage with fans, but keep your responses concise, interesting, and true to your character.`,
                },
            });
        }
        
        const chat = chatSessions[artist.id];
        const result = await chat.sendMessage({ message });
        
        return result.text;
    } catch (error) {
        console.error("Gemini API error:", error);
        return "I'm having trouble connecting to my creative matrix right now. Please try again in a moment.";
    }
};

type GeneratedStudioProject = Omit<StudioSubmission, 'id' | 'userEmail' | 'userName' | 'prompt' | 'selectedCoAiArtistId' | 'status'>;

const handleApiError = (error: any, context: string) => {
    console.error(`Gemini API error in ${context}:`, error);
    throw new Error(`My creative circuits are buzzing with interference. I can't seem to generate the ${context} right now.`);
};

export const generateDescriptionText = async (context: object, userPrompt: string, fieldLabel: string): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set. Cannot generate text.");
    }
    
    try {
        const fullPrompt = `You are Jason, the AI Executive Producer for S.M.T. Music Studio. Your personality is defined by three pillars: Functionality, Simplicity, and Beauty.
        Your task is to write a compelling, professional, and creative text for a "${fieldLabel}" field.

        Here is the context for the item you are describing:
        \`\`\`json
        ${JSON.stringify(context, null, 2)}
        \`\`\`

        Here are additional instructions from the user:
        "${userPrompt || 'No additional instructions.'}"

        Based on all this information, generate a creative and fitting ${fieldLabel.toLowerCase()}. The tone should be professional, engaging, and consistent with the S.M.T. brand.
        Do not include the label (e.g., "Description:") in your response. Just return the text itself.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: fullPrompt,
        });

        return response.text.trim();
    } catch (error) {
        console.error("Gemini API error in generateDescriptionText:", error);
        throw new Error("Failed to generate description from creative matrix.");
    }
};

export const generateCreativeConcept = async (prompt: string, artist: Artist): Promise<Pick<GeneratedStudioProject, 'generatedIdea' | 'lyrics' | 'sunoTitle' | 'sunoStyle' | 'sunoTags' | 'weirdness' | 'styleInfluence' | 'audioInfluence'>> => {
    if (!process.env.API_KEY) throw new Error("API_KEY environment variable not set.");
    try {
        const fullPrompt = `You are an expert AI music producer named Jason. A user wants to collaborate on a song with AI artist ${artist.name}.
        User's idea: "${prompt}"
        Artist's personality: "${artist.personality}"

        Your task is to generate:
        1.  **Creative Direction:** A short, inspiring paragraph describing the mood, instruments, and overall vibe.
        2.  **Lyrics:** Full song structure (e.g., Verse 1, Chorus). The style must match ${artist.name}'s personality.
        3.  **Suno Generation Parameters:** Parameters for the Suno AI music generator.
            -   **Song Title:** A catchy title. Max 50 chars.
            -   **Style Description:** A descriptive string for Suno's style prompt.
            -   **Tags:** A list of 3-5 relevant musical tags.
            -   **Advanced Options:** 'weirdness', 'styleInfluence', 'audioInfluence' (0-100 integer percentages).
        `;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: fullPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        generatedIdea: { type: Type.STRING, description: "The creative direction paragraph." },
                        lyrics: { type: Type.STRING, description: "The full song lyrics, with sections like [Verse 1], [Chorus], etc." },
                        sunoTitle: { type: Type.STRING, description: "A catchy song title." },
                        sunoStyle: { type: Type.STRING, description: "A descriptive string of genres and keywords for Suno.ai." },
                        sunoTags: { type: Type.ARRAY, description: "A list of relevant musical tags.", items: { type: Type.STRING } },
                        weirdness: { type: Type.INTEGER, description: "A percentage value (0-100) for Suno's 'Weirdness' parameter." },
                        styleInfluence: { type: Type.INTEGER, description: "A percentage value (0-100) for Suno's 'Style Influence' parameter." },
                        audioInfluence: { type: Type.INTEGER, description: "A percentage value (0-100) for Suno's 'Audio Influence' parameter." }
                    }
                }
            }
        });
        return JSON.parse(response.text);
    } catch (error) {
        handleApiError(error, 'creative concept');
        throw error; // rethrow after logging
    }
};

export const generateSoundPaletteForIdea = async (prompt: string, generatedIdea: string, artist: Artist): Promise<Pick<GeneratedStudioProject, 'soundPalette'>> => {
    if (!process.env.API_KEY) throw new Error("API_KEY environment variable not set.");
    const soundCatalogDescription = SOUND_CATALOG.map(s => `${s.category} - ${s.id}: ${s.name}`).join('\n');
    const availableStemIds = SOUND_CATALOG.map(s => s.id);
    try {
        const fullPrompt = `You are an expert AI music producer named Jason. Based on the user's initial prompt, the creative direction, and the artist's personality, choose a sound palette.
        Initial Prompt: "${prompt}"
        Creative Direction: "${generatedIdea}"
        Artist Personality: "${artist.personality}"

        Your task: Choose EXACTLY ONE sound stem for each category (Drums, Bass, Melody, Pads, FX) from the provided S.M.T. Sound Catalog. You MUST use the exact IDs.

        Available S.M.T. Sound Catalog:
        ${soundCatalogDescription}
        `;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: fullPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        soundPalette: {
                            type: Type.ARRAY,
                            description: "The selected sound stems.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    category: { type: Type.STRING, enum: Object.values(SoundStemCategory) },
                                    stemId: { type: Type.STRING, enum: availableStemIds },
                                },
                            }
                        },
                    }
                }
            }
        });
        return JSON.parse(response.text);
    } catch (error) {
        handleApiError(error, 'sound palette');
        throw error;
    }
};

export const generateStoryboardForIdea = async (prompt: string, generatedIdea: string, artist: Artist): Promise<Pick<GeneratedStudioProject, 'videoStoryboard'>> => {
    if (!process.env.API_KEY) throw new Error("API_KEY environment variable not set.");
    try {
        const fullPrompt = `You are an expert AI music video director named Jason. Based on the user's initial prompt, the creative direction, and the artist's personality, create a video storyboard.
        Initial Prompt: "${prompt}"
        Creative Direction: "${generatedIdea}"
        Artist Personality: "${artist.personality}"
        
        Your task: Create a 4-scene storyboard. For each scene, provide: a) a description of the action, b) a DALL-E style prompt for an "entry shot", and c) a DALL-E style prompt for an "exit shot". The prompts should be cinematic and coherent.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: fullPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        videoStoryboard: {
                            type: Type.ARRAY,
                            description: "The 4-scene video storyboard.",
                            items: {
                                type: Type.OBJECT, properties: {
                                    scene: { type: Type.INTEGER },
                                    description: { type: Type.STRING },
                                    generatedImagePrompt_entry: { type: Type.STRING },
                                    generatedImagePrompt_exit: { type: Type.STRING }
                                }
                            }
                        }
                    }
                }
            }
        });
        const project = JSON.parse(response.text) as Pick<GeneratedStudioProject, 'videoStoryboard'>;

        const imagePrompts = project.videoStoryboard.flatMap(scene => [scene.generatedImagePrompt_entry, scene.generatedImagePrompt_exit]);
        const imagePromises = imagePrompts.map(p => generateImage(p));
        const generatedStillsData = await Promise.all(imagePromises);
        
        project.videoStoryboard.forEach((scene, index) => {
            scene.stillUrl_entry = `data:image/jpeg;base64,${generatedStillsData[index * 2]}`;
            scene.stillUrl_exit = `data:image/jpeg;base64,${generatedStillsData[index * 2 + 1]}`;
        });

        return project;
    } catch (error) {
        handleApiError(error, 'video storyboard');
        throw error;
    }
}

export const generateStudioIdea = async (prompt: string, artist: Artist): Promise<GeneratedStudioProject> => {
     if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set. Cannot generate studio idea.");
    }

    const soundCatalogDescription = SOUND_CATALOG.map(s => `${s.category} - ${s.id}: ${s.name}`).join('\n');
    const availableStemIds = SOUND_CATALOG.map(s => s.id);

    try {
        const fullPrompt = `You are an expert AI music producer and creative director named Jason. A user wants to collaborate on a full song project with the AI artist ${artist.name}.

        The user's initial idea is: "${prompt}"
        The collaborating artist's personality is: "${artist.personality}"

        Your task is to generate a complete creative project based on this. The project must include:
        1.  **Creative Direction:** A short, inspiring paragraph describing the mood, instruments, and overall vibe.
        2.  **Lyrics:** A full song structure (e.g., Verse 1, Chorus, Verse 2, Chorus, Bridge, Chorus). The lyrical style must match the personality of ${artist.name}.
        3.  **Sound Palette:** Choose exactly one sound stem for each category (Drums, Bass, Melody, Pads, FX) from the provided S.M.T. Sound Catalog. You MUST use the exact IDs from the list.
        4.  **Video Storyboard:** Create a 4-scene storyboard for a music video. For each scene, provide: a) a description of the scene's action, b) a DALL-E style prompt for an "entry shot" (establishing the scene), and c) a DALL-E style prompt for an "exit shot" (concluding the scene's action or transitioning out). The prompts should be cinematic and coherent.
        5.  **Suno Generation Parameters:** Generate parameters for the Suno AI music generator based on the creative direction.
            -   **Song Title:** A catchy, relevant title for the song. Max 50 characters.
            -   **Style Description:** A descriptive string of genres and keywords for Suno's style prompt (e.g., "Epic cinematic trailer music, orchestral, hybrid, intense, pulse").
            -   **Tags:** A list of 3-5 relevant musical tags as an array of strings (e.g., ["soundtrack", "electronic", "cinematic"]).
            -   **Advanced Options:** Provide integer percentage values (0-100) for the following: 'weirdness', 'styleInfluence', and 'audioInfluence'.

        Here is the available S.M.T. Sound Catalog:
        ${soundCatalogDescription}
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: fullPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        generatedIdea: { type: Type.STRING, description: "The creative direction paragraph." },
                        lyrics: { type: Type.STRING, description: "The full song lyrics, with sections like [Verse 1], [Chorus], etc." },
                        soundPalette: {
                            type: Type.ARRAY,
                            description: "The selected sound stems for the project.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    category: { type: Type.STRING, enum: Object.values(SoundStemCategory) },
                                    stemId: { type: Type.STRING, enum: availableStemIds },
                                },
                            }
                        },
                        videoStoryboard: {
                            type: Type.ARRAY,
                            description: "The 4-scene video storyboard.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    scene: { type: Type.INTEGER },
                                    description: { type: Type.STRING },
                                    generatedImagePrompt_entry: { type: Type.STRING, description: "A DALL-E style prompt for the scene's entry shot." },
                                    generatedImagePrompt_exit: { type: Type.STRING, description: "A DALL-E style prompt for the scene's exit shot." }
                                }
                            }
                        },
                        sunoTitle: { type: Type.STRING, description: "A catchy song title." },
                        sunoStyle: { type: Type.STRING, description: "A descriptive string of genres and keywords for Suno.ai." },
                        sunoTags: {
                            type: Type.ARRAY,
                            description: "A list of relevant musical tags.",
                            items: { type: Type.STRING }
                        },
                        weirdness: { type: Type.INTEGER, description: "A percentage value (0-100) for Suno's 'Weirdness' parameter." },
                        styleInfluence: { type: Type.INTEGER, description: "A percentage value (0-100) for Suno's 'Style Influence' parameter." },
                        audioInfluence: { type: Type.INTEGER, description: "A percentage value (0-100) for Suno's 'Audio Influence' parameter." }
                    }
                }
            }
        });

        const project = JSON.parse(response.text) as GeneratedStudioProject;

        const imagePrompts = project.videoStoryboard.flatMap(scene => [scene.generatedImagePrompt_entry, scene.generatedImagePrompt_exit]);
        const imagePromises = imagePrompts.map(p => 
            generateImage(p)
        );
        const generatedStillsData = await Promise.all(imagePromises);
        
        project.videoStoryboard.forEach((scene, index) => {
            scene.stillUrl_entry = `data:image/jpeg;base64,${generatedStillsData[index * 2]}`;
            scene.stillUrl_exit = `data:image/jpeg;base64,${generatedStillsData[index * 2 + 1]}`;
        });

        return project;
    } catch (error) {
        handleApiError(error, 'full project');
        throw error;
    }
};

export const generateImage = async (prompt: string): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set. Cannot generate image.");
    }

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: `A professional, high-quality, cinematic image. Style: photorealistic. Prompt: ${prompt}`,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '16:9',
            },
        });
        
        return response.generatedImages[0].image.imageBytes;
    } catch (error) {
        console.error("Gemini API error in generateImage:", error);
        throw new Error("Failed to generate image from creative matrix.");
    }
};