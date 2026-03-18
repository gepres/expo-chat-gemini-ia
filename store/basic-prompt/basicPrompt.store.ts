import * as GeminiActions from '@/actions/gemini/basic-prompt.action';
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
  addMessage: async (text: string) => {
    const userMessage = createMessage(text, 'user');
    set((state) => ({
      geminiWriting: true,
      messages: [userMessage, ...state.messages]
    }))

    // Petición a Gemini
    const geminiResponseText = await GeminiActions.getBasicPrompt(text);

    const geminiMessage = createMessage(geminiResponseText, 'gemini');

     set((state) => ({
      geminiWriting: false,
      messages: [geminiMessage, ...state.messages]
    }))

  },
  setGeminiWriting: (isWriting: boolean) => set(({ geminiWriting: isWriting })),
}))