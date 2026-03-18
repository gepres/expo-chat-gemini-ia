import * as GeminiActions from '@/actions/gemini';
import { Message } from '@/interfaces/chat.interfaces';
import uuid from 'react-native-uuid';
import { create } from 'zustand';



interface State {
  geminiWriting: boolean;
  messages: Message[];
  addMessage: (text: string) => void;
  setGeminiWriting: (isWriting: boolean) => void;
}


const createMessage = (text: string, sender: 'user' | 'gemini'): Message => {
  return {
    id: uuid.v4(),
    text,
    createdAt: new Date(),
    sender,
    type: 'text',
  }
}


export const useBasicPromptStore = create<State>()((set) => ({
  geminiWriting: false,
  messages: [],
  addMessage: async (prompt: string) => {

    const userMessage = createMessage(prompt, 'user');
    const geminiMessage = createMessage('Generaron respuesta...', 'gemini');

    set((state) => ({
      geminiWriting: false,
      messages: [geminiMessage, userMessage, ...state.messages]
    }))

    // Petición a Gemini sin stream
    // const geminiResponseText = await GeminiActions.getBasicPrompt(prompt);

    // const geminiMessage = createMessage(geminiResponseText, 'gemini');

    //  set((state) => ({
    //   geminiWriting: false,
    //   messages: [geminiMessage, ...state.messages]
    // }))


    // Petición a Gemini con stream
    await GeminiActions.getBasicPromptStream(prompt, (text) => {
      set((state) => ({
        messages: state.messages.map(
          (msg) => msg.id === geminiMessage.id ? {...msg, text} : msg
        ),
      }))
    });

  },
  setGeminiWriting: (isWriting: boolean) => set(({ geminiWriting: isWriting })),
}))