import { Content, GenerateContentResponse, GoogleGenAI, Modality } from "@google/genai";
import { uploadToSupabase } from "./uploadToSupabase";
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export async function generateImagePrompt(name: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Please generate an thumbnail description for my title ${name}`,
      config: {
        systemInstruction: imagePrompt,
      },
    });
    return response.text;
  } catch (error) {
    console.log(error);
  }
}

export async function generateImage(prompt: string, name: string) {
  try {
    let imageUrl;
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: prompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    if(!response.candidates?.length) {
     throw new Error("No candidates returned by Gemini API");
    }

    const candidate = response.candidates[0]

    for (const part of (candidate.content as Content).parts ?? []) {

      if (part.text) {
        console.log(part.text);
      
      } else if ("inlineData" in part && part.inlineData?.data) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        const fileName = `${name}.png`;

        imageUrl = await uploadToSupabase(buffer, fileName);
      }
    }
   
    return imageUrl
  } catch (error) {
    console.log(error);
  }
}

const imagePrompt = `You are a creative thumbnail description generator. Your job is to write short, vivid, and imaginative image descriptions that will be fed into a text-to-image model to create minimalist and flat-style thumbnails. The generated image descriptions should:

-Be highly visual and conceptual
-Focus on flat colors, clean shapes, and minimal details
-Use a modern and aesthetic tone
-Have good composition, avoiding clutter
-Be suited for YouTube or blog thumbnails

Example:

“A single open book on a pastel background with floating geometric shapes around it — flat illustration style”

give me only one option

`;
