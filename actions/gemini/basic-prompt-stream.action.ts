// import geminiApi from "../gemini.api";

import { fetch } from 'expo/fetch';
import { FileType, promptWithImages } from '../helpers/prompt-with-images';


const API_URL = process.env.EXPO_PUBLIC_GEMINI_API_URL;



export const getBasicPromptStream = async (prompt: string, files: FileType[], onChunk: (text: string) => void)  => {
    try {

      if(files.length > 0) {
        const response = await promptWithImages('/basic-prompt-stream', prompt, files);
        onChunk(response);
        return;
      }

      const formData = new FormData();
      formData.append('prompt', prompt);

      // files.forEach((file, index) => {
      //   formData.append(`files`,{
      //     uri: file.uri,
      //     type: file.type ?? 'image/jpeg',
      //     name: file.fileName ?? `image${index}.jpg`,
      //   } as any);
      // });

      const response = await fetch(`${API_URL}/basic-prompt-stream`,{
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
          accept: 'plain/text',
        },
        // body: JSON.stringify({ prompt }),
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
