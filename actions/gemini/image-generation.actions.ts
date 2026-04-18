import { ImagePickerAsset } from 'expo-image-picker';
import { FileType, promptWithImages } from '../helpers/prompt-with-images';

export interface ImageGenerationResponse {
    imageUrl: string;
    text: string;
}


export const getImageGeneration = async (prompt: string, files: (FileType|ImagePickerAsset)[]): Promise<ImageGenerationResponse>  => {
    try {

      const response = await promptWithImages<ImageGenerationResponse>('/image-generation', {prompt}, files);

      return response;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener la respuesta');
    }
};
