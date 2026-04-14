import geminiApi from '../gemini.api';

export interface FileType {
  uri: string;
  fileName?: string;
  type?: string;
}

interface JsonBody {
  [key:string]: any;
}

export const promptWithImages = async (
  endpoint: string,
  body: JsonBody,
  files: FileType[]
): Promise<string> => {
  try {
    const formData = new FormData();



    Object.entries(body).forEach(([key, value]) => {
      formData.append(key, value);
    })

    files.forEach((file) => {
      formData.append('files', {
        uri: file.uri,
        name: file.fileName ?? 'image.jpg',
        type: file.type ?? 'image/jpeg',
      } as unknown as Blob);
    });

    const response = await geminiApi.post(endpoint, formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};