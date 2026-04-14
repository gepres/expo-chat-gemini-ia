import * as GeminiActions from '@/actions/gemini';
import { Message } from '@/interfaces/chat.interfaces';
import uuid from 'react-native-uuid';
import { create } from 'zustand';



interface State {
  geminiWriting: boolean;
  chatId: string;
  messages: Message[];
  addMessage: (text: string, attachments: any[]) => void;
  clearChat: () => void;
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


export const useChatContextStore = create<State>()((set, get) => ({
  geminiWriting: false,
  chatId: uuid.v4(),
  messages: [],
  addMessage: async (prompt: string, attachments: any[]) => {

    const userMessage = createMessage(prompt, 'user', attachments);
    const geminiMessage = createMessage('Generaron respuesta...', 'gemini');

    const { chatId } = get();

    set((state) => ({
      geminiWriting: false,
      messages: [geminiMessage, userMessage, ...state.messages]
    }))


    // Petición a Gemini con stream
    await GeminiActions.getChatStream(prompt, chatId, attachments, (text) => {
      set((state) => ({
        messages: state.messages.map(
          (msg) => msg.id === geminiMessage.id ? {...msg, text} : msg
        ),
      }))
    });

  },
  clearChat: () => set({ messages: [], chatId: uuid.v4() }),
}))