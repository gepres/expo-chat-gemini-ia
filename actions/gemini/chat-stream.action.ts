// import geminiApi from "../gemini.api";

import { fetch } from 'expo/fetch';
import { FileType, promptWithImages } from '../helpers/prompt-with-images';


const API_URL = process.env.EXPO_PUBLIC_GEMINI_API_URL;



export const getChatStream = async (prompt: string, chatId: string ,files: FileType[], onChunk: (text: string) => void)  => {
    try {

      if(files.length > 0) {
        const response = await promptWithImages('/chat-prompt-stream', {prompt, chatId}, files);
        onChunk(response);
        return;
      }

      const formData = new FormData();
      formData.append('prompt', prompt);
      formData.append('chatId', chatId);


      const response = await fetch(`${API_URL}/chat-prompt-stream`,{
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: 'plain/text',
        },
        body: formData,
      })
  
      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      let result = '';

      while (true) {
        const { done, value } = await reader?.read();
        if (done) break;
        const chunk = decoder.decode(value);
        result += chunk;
        onChunk(result);
      }

    } catch (error) {
        console.error(error);
        return 'Error al obtener la respuesta';
    }
};
