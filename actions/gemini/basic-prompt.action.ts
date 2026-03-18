import geminiApi from "../gemini.api";

interface ResponseBasicPrompt {
    message: string;
}

export const getBasicPrompt = async (prompt: string): Promise<string> => {
    try {
  
        const response = await geminiApi.post<ResponseBasicPrompt>('/basic-prompt', 
          { prompt },
          {
            responseType: 'json'
          }
        );
      
        return response.data?.message
    } catch (error) {
        console.error(error);
        return 'Error al obtener la respuesta';
    }
};
