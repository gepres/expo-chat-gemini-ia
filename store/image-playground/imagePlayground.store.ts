import * as GeminiActions from "@/actions/gemini";
import { FileType } from "@/actions/helpers/prompt-with-images";
import { urlToImageFile } from "@/actions/helpers/url-to-image-file";
import { ImagePickerAsset } from "expo-image-picker";
import { create } from "zustand";

interface State {
    // state
    isGenerating: boolean;
    images: string[];
    history: string[];
    

    previousPrompt: string;
    previousImage: (FileType|ImagePickerAsset)[];
    
    seletedStyle: string;
    seletedAspect: string;
    selectedImage: string;
    
    // actions

    generateImage: (prompt: string, images: (FileType|ImagePickerAsset)[]) => Promise<void>;
    
    generateNextImage: () => Promise<void>;
    
    setSelectedStyle: (style: string) => void;
    setSelectedAspect: (aspect: string) => void;
    setSelectedImage: (image: string) => void;
}

export const useImagePlaygroundStore = create<State>((set, get) => ({
    isGenerating: false,
    images: [],
    history: [],
    previousPrompt: "",
    previousImage: [],
    seletedStyle: "",
    seletedAspect: "",
    selectedImage: "",
    
    generateImage: async (prompt: string, images: (FileType|ImagePickerAsset)[]):Promise<void> => {

        const selectedStyle = get().seletedStyle;
        const selectedImage = get().selectedImage;

        set({ 
            isGenerating: true,
            images: [],
            previousPrompt: prompt,
            previousImage: images,
        })

        
        if(selectedStyle !== '') {
            prompt = `${prompt}, con un estilo ${selectedStyle}`
        }

        if(selectedImage !== '') {
           const imageFile = await urlToImageFile(selectedImage);
           images.push(imageFile);
        }

        const { imageUrl} = await GeminiActions.getImageGeneration(prompt, images)

        console.log({imageUrl});
        

        if(imageUrl === '') {
            set({
                isGenerating: false,
            })
            return;
        }

        const currentImages = [imageUrl, ...get().history]

        set({
            images: [imageUrl],
            isGenerating: false,
            history: currentImages,
        })

        setTimeout(() => {
            get().generateNextImage();
        }, 500);


   
    },
    
    generateNextImage: async ():Promise<void> => {
        const currentImages = get().images;
        const currentHistory = get().history;
        let previousImagePrompt = get().previousPrompt;
        const previousImages = get().previousImage
        const selectedStyle = get().seletedStyle;

        if(selectedStyle !== '') {
            previousImagePrompt = `${previousImagePrompt}, con un estilo ${selectedStyle}`
        }

        set({
            isGenerating: true,
        })


        const {imageUrl} = await GeminiActions.getImageGeneration(previousImagePrompt, previousImages)

        if(imageUrl === '') {
            set({
                isGenerating: false,
            })
            return;
        }

        const newImages = [...currentImages, imageUrl]
        const newHistory = [imageUrl, ...currentHistory]

        set({
            images: newImages,
            isGenerating: false,
            history: newHistory,
        })
    },
    
    setSelectedStyle: (style: string) => {
        const { seletedStyle } = get();
        
        if(style === seletedStyle){ 
            set({ seletedStyle: "" })
        } else{
            set({ seletedStyle: style })
        }
    },
    setSelectedAspect: (aspect: string) => set({ seletedAspect: aspect }),
    setSelectedImage: (imageUrl: string) => {
        const { selectedImage } = get();
        
        if(imageUrl === selectedImage){ 
            set({ selectedImage: "" })
        } else{
            set({ selectedImage: imageUrl })
        }
    },
}));