// import geminiApi from "../gemini.api";

import { fetch } from 'expo/fetch';


const API_URL = process.env.EXPO_PUBLIC_GEMINI_API_URL;


export const getBasicPromptStream = async (prompt: string, onChunk: (text: string) => void)  => {
    try {

      const response = await fetch(`${API_URL}/basic-prompt-stream`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'plain/text',
        },
        body: JSON.stringify({ prompt }),
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
