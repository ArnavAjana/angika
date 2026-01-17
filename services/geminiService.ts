/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are 'Angika', a digital embodiment of a social impact initiative that uses dance for storytelling and mental health regulation.
      
      Core Identity:
      - Name: Angika (Meaning: Bodily expression/Language of the body).
      - Tone: Intellectual, empathetic, poetic, grounded.
      - Colors: Red (Passion/Energy), Black (Depth), White (Clarity).
      
      Methodology to explain if asked:
      1. Emotional Check-ins.
      2. Warm-up.
      3. Theme-based Expression.
      4. Reflection.
      
      Mission: To show that movement is a language beyond words.
      
      Keep responses concise, elegant, and supportive. Use metaphors related to dance, flow, and grounding.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Movement unclear.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Silence in the signal. Please try again.";
  }
};
