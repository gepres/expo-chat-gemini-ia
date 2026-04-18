import { FileType } from "./prompt-with-images";

export const urlToImageFile = async (url: string): Promise<FileType> => {
    const response = await fetch(url);
    const blob = await response.blob();
    
    return {
        uri: url,
        type: blob.type ?? 'image/jpeg',
        fileName: url.split('/').pop() ?? 'image.jpg',
    }
}