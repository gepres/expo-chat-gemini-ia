import * as GeminiActions from '@/actions/gemini';
import { Message } from '@/interfaces/chat.interfaces';
import uuid from 'react-native-uuid';
import { create } from 'zustand';



interface State {
  geminiWriting: boolean;
  messages: Message[];
  addMessage: (text: string, attachments: any[]) => void;
  setGeminiWriting: (isWriting: boolean) => void;
}


const createMessage = (text: string, sender: 'user' | 'gemini', attachments: any[] = []): Message => {
  if(attachments?.length > 0) {
    return {
      id: uuid.v4(),
      text,
      createdAt: new Date(),
      sender,
      type: 'image',
      images: attachments.map((image) => image.uri),
    }
  }

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
  addMessage: async (prompt: string, attachments: any[]) => {

    const userMessage = createMessage(prompt, 'user', attachments);
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


    // console.log('Petición a Gemini con stream');

    // Petición a Gemini con stream
    await GeminiActions.getBasicPromptStream(prompt, attachments, (text) => {
      set((state) => ({
        messages: state.messages.map(
          (msg) => msg.id === geminiMessage.id ? {...msg, text} : msg
        ),
      }))
    });

    // console.log('Respuesta de Gemini con stream');

  },
  setGeminiWriting: (isWriting: boolean) => set(({ geminiWriting: isWriting })),
}))